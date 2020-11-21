import Collection from 'database/Collection';

import {
  PutItemInput,
  AttributeValue,
  GetItemInput,
  QueryInput,
} from 'aws-sdk/clients/dynamodb';

import { Category as ICategory, Product } from 'types/models';

class Category extends Collection<ICategory> {
  constructor(prefix: string) {
    super(prefix);
  }

  public getKey(slug: string): AttributeValue {
    return `${this.Prefix}#${slug}` as any;
  }

  public async categoryExists(slug: string): Promise<boolean> {
    const PK = this.getKey(slug);
    const parameters: GetItemInput = {
      TableName: Collection.TableName,
      Key: {
        PK,
        SK: PK,
      },
    };

    const category = await Collection.Client.get(parameters).promise();
    return !!category.Item;
  }

  public async createCategory(data: ICategory): Promise<ICategory> {
    const PK = this.getKey(data.slug);
    const transformedParameters = Collection.transformParameters(data);

    const parameters: PutItemInput = {
      TableName: Collection.TableName,
      Item: {
        ...transformedParameters,
        PK,
        SK: PK,
      },
      ConditionExpression: 'attribute_not_exists(PK)',
    };
    await Collection.Client.put(parameters).promise();
    return data;
  }

  public async getCategory(
    slug: string
  ): Promise<{ category?: ICategory; products?: Array<Product> }> {
    const PK = this.getKey(slug);
    const parameters: QueryInput = {
      TableName: Collection.TableName,
      KeyConditionExpression: 'PK = :pk',
      ExpressionAttributeValues: {
        ':pk': PK,
      },
      ScanIndexForward: false,
    };

    const category = await Collection.Client.query(parameters).promise();

    if (category.Items)
      return {
        category: category.Items.shift() as any,
        products: category.Items as any,
      };

    return {};
  }
}

export default new Category('CATEGORY');
