import Collection from 'database/Collection';
import { ulid } from 'ulid';

import {
  AttributeValue,
  PutItemInput,
  QueryInput,
  TransactWriteItemsInput,
} from 'aws-sdk/clients/dynamodb';

import {
  Order as IOrder,
  Product,
  Transaction,
  WithGSI,
  WithKeys,
} from 'types/models';
import HttpError from '~/utils/HttpError';

class Order extends Collection<IOrder> {
  constructor(prefix: string) {
    super(prefix);
  }

  public getUniqueKey(slug: string): AttributeValue {
    return `${this.Prefix}#${slug}` as any;
  }

  public getKey(slug: string): AttributeValue {
    return `#${slug}` as any;
  }

  private static createProductsItems(
    uniqueKey: AttributeValue,
    products: Array<Product & { quantity: number }>
  ) {
    return products.map((product) => ({
      Put: {
        TableName: Collection.TableName,
        Item: Collection.transformParameters({
          ...product,
          PK: `${uniqueKey}#PRODUCT#${product.slug}`,
          SK: `${uniqueKey}#PRODUCT#${product.slug}`,
          GSI1PK: uniqueKey,
          GSI1SK: `PRODUCT#${product.slug}`,
        }),
      },
    }));
  }

  public async createOrder(customerId: string, data: IOrder): Promise<IOrder> {
    const id = ulid();
    const uniqueKey = this.getUniqueKey(id);
    const transformedParameters = Collection.transformParameters(data);

    const parameters: TransactWriteItemsInput = {
      TransactItems: [
        {
          Put: {
            TableName: Collection.TableName,
            Item: {
              ...transformedParameters,
              customerId: customerId as AttributeValue,
              orderId: id as AttributeValue,
              PK: customerId as AttributeValue,
              SK: `#${uniqueKey}` as AttributeValue,
              GSI1PK: uniqueKey,
              GSI1SK: uniqueKey,
              products: (undefined as unknown) as AttributeValue,
            },
          },
        },
        ...Order.createProductsItems(uniqueKey, data.products),
      ],
    };
    await Collection.Client.transactWrite(parameters).promise();
    return data;
  }

  public async updateOrderStatus(
    orderId: string,
    status: string
  ): Promise<IOrder> {
    const order = await this.getOrder(orderId);
    const parameters: PutItemInput = {
      TableName: Collection.TableName,
      Item: Collection.transformParameters({ ...order.order, status }),
    };
    await Collection.Client.put(parameters).promise();
    return { ...order, status } as any;
  }

  public async getOrder(
    orderId: string
  ): Promise<{
    order: IOrder;
    products: Array<Product & WithKeys & WithGSI & { quantity: number }>;
    transactions: Array<Transaction & WithKeys & WithGSI>;
  }> {
    const PK = this.getUniqueKey(orderId);
    const parameters: QueryInput = {
      TableName: Collection.TableName,
      IndexName: 'GSI1',
      KeyConditionExpression: 'GSI1PK = :pk',
      ExpressionAttributeValues: {
        ':pk': PK,
      },
    };
    const result = await Collection.Client.query(parameters).promise();
    if (!result.Count || !result.Items?.length)
      throw new HttpError('Order not found', 404);

    const data = result.Items as Array<
      | (Order & WithKeys & WithGSI)
      | (Product & WithKeys & WithGSI)
      | (Transaction & WithKeys & WithGSI)
    >;

    const order = data.filter((item) => item.SK === `#${PK}`).pop();
    const transactions = data.filter((item) =>
      item.PK.startsWith('TRANSACTION')
    );
    const products = data.filter((item) => item.GSI1SK.startsWith('PRODUCT'));
    return {
      order,
      products,
      transactions,
    } as any;
  }
}

export default new Order('ORDER');
