import Collection from 'database/Collection';

import {
  PutItemInput,
  AttributeValue,
  GetItemInput,
  QueryInput,
} from 'aws-sdk/clients/dynamodb';

import { Category as ICategory, Product } from 'types/models';
import HttpError from '~/utils/HttpError';

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
        GSI1PK: this.Prefix as AttributeValue,
        GSI1SK: PK,
      },
      ConditionExpression: 'attribute_not_exists(PK)',
    };
    await Collection.Client.put(parameters).promise();
    return data;
  }

  public async getCategories() {
    const parameters: QueryInput = {
      TableName: Collection.TableName,
      IndexName: 'GSI1',
      KeyConditionExpression: 'GSI1PK = :pk',
      ExpressionAttributeValues: {
        ':pk': this.Prefix as AttributeValue,
      },
    };
    const data = await Collection.Client.query(parameters).promise();
    return data.Items;
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

    throw new HttpError('Category not found', 404);
  }
}

export default new Category('CATEGORY');
