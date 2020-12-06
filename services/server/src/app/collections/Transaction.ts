import Collection from 'database/Collection';
import { ulid } from 'ulid';

import {
  AttributeValue,
  GetItemInput,
  PutItemInput,
} from 'aws-sdk/clients/dynamodb';

import { Transaction as ITransaction } from 'types/models';
import HttpError from '~/utils/HttpError';

class Transaction extends Collection<ITransaction> {
  constructor(prefix: string) {
    super(prefix);
  }

  public getUniqueKey(slug: string): AttributeValue {
    return `${this.Prefix}#${slug}` as any;
  }

  public async createTransaction(
    orderId: string,
    data: Partial<ITransaction>
  ): Promise<Partial<ITransaction>> {
    const id = ulid();
    const uniqueKey = this.getUniqueKey(id);
    const transformedParameters = Collection.transformParameters(data);

    const parameters: PutItemInput = {
      TableName: Collection.TableName,
      Item: {
        ...transformedParameters,
        orderId: id as AttributeValue,
        PK: uniqueKey as AttributeValue,
        SK: uniqueKey as AttributeValue,
        GSI1PK: `ORDER#${orderId}` as AttributeValue,
        GSI1SK: `#${uniqueKey}` as AttributeValue,
      },
      ConditionExpression: 'attribute_not_exists(PK)',
    };
    await Collection.Client.put(parameters).promise();
    return { ...data, orderId: id };
  }

  public async getTransaction(transactionId: string): Promise<Transaction> {
    const PK = this.getUniqueKey(transactionId);
    const parameters: GetItemInput = {
      TableName: Collection.TableName,
      Key: {
        PK,
        SK: PK,
      },
    };
    const result = await Collection.Client.get(parameters).promise();
    if (!result.Item) throw new HttpError('Transaction not found', 404);
    return result.Item as any;
  }
}

export default new Transaction('TRANSACTION');
