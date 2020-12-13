import Collection from 'database/Collection';
import { ulid } from 'ulid';

import {
  AttributeValue,
  PutItemInput,
  QueryInput,
} from 'aws-sdk/clients/dynamodb';

import { Transaction as ITransaction } from 'types/models';
import { TransactionStatusDescription } from 'types/gateway/pagseguro';
import HttpError from '~/utils/HttpError';
import transactionStatus from '~/utils/transactionStatus';

class Transaction extends Collection<ITransaction> {
  constructor(prefix: string) {
    super(prefix);
  }

  public getUniqueKey(slug: string): AttributeValue {
    return `${this.Prefix}#${slug}` as any;
  }

  public getTransactionStatusText(
    status: keyof TransactionStatusDescription
  ): string {
    return transactionStatus[status];
  }

  public async createTransaction(
    orderId: string,
    data: Partial<ITransaction>
  ): Promise<Partial<ITransaction>> {
    const id = ulid();
    const uniqueKey = this.getUniqueKey(data.transaction!.code);
    const transformedParameters = Collection.transformParameters(data);

    const parameters: PutItemInput = {
      TableName: Collection.TableName,
      Item: {
        ...transformedParameters,
        orderId: orderId as AttributeValue,
        PK: uniqueKey as AttributeValue,
        SK: `${uniqueKey}#${id}` as AttributeValue,
        GSI1PK: `ORDER#${orderId}` as AttributeValue,
        GSI1SK: `#${uniqueKey}` as AttributeValue,
      },
      ConditionExpression: 'attribute_not_exists(PK)',
    };
    await Collection.Client.put(parameters).promise();
    return { ...data, orderId: id };
  }

  public async getTransaction(transactionId: string): Promise<ITransaction> {
    const PK = this.getUniqueKey(transactionId);
    const parameters: QueryInput = {
      TableName: Collection.TableName,
      KeyConditionExpression: 'PK = :pk',
      ExpressionAttributeValues: {
        ':pk': PK,
      },
      Limit: 1,
    };
    const result = await Collection.Client.query(parameters).promise();
    if (!result.Items?.length)
      throw new HttpError('Transaction not found', 404);
    return result.Items.pop() as any;
  }
}

export default new Transaction('TRANSACTION');
