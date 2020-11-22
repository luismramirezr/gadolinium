import Collection from 'database/Collection';

import {
  AttributeValue,
  TransactWriteItemsInput,
  QueryInput,
} from 'aws-sdk/clients/dynamodb';

import { Product as IProduct } from 'types/models';
import HttpError from '~/utils/HttpError';

class Product extends Collection<IProduct> {
  constructor(prefix: string) {
    super(prefix);
  }

  public getUniqueKey(slug: string): AttributeValue {
    return `${this.Prefix}#${slug}` as any;
  }

  public getKey(slug: string): AttributeValue {
    return `#${slug}` as any;
  }

  public async createProduct(data: IProduct): Promise<IProduct> {
    const PK = this.getUniqueKey(data.slug);
    const SK = this.getKey(data.slug);
    const transformedParameters = Collection.transformParameters(data);

    const parameters: TransactWriteItemsInput = {
      TransactItems: [
        {
          Put: {
            TableName: Collection.TableName,
            Item: {
              PK,
              SK: PK,
            },
            ConditionExpression: 'attribute_not_exists(PK)',
          },
        },
        {
          Put: {
            TableName: Collection.TableName,
            Item: {
              ...transformedParameters,
              PK: transformedParameters.category,
              SK,
              GSI1PK: PK,
              GSI1SK: PK,
            },
            ConditionExpression:
              'attribute_not_exists(PK) AND attribute_not_exists(SK)',
          },
        },
      ],
    };
    await Collection.Client.transactWrite(parameters).promise();
    return data;
  }

  public async getProduct(slug: string): Promise<IProduct> {
    const PK = this.getUniqueKey(slug);
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
      throw new HttpError(`Product '${slug}' not found`, 404);
    const product = result.Items?.shift();
    return product as any;
  }
}

export default new Product('PRODUCT');
