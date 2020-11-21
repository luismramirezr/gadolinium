import { DynamoDB, Client } from 'database/Client';
import { TABLE_NAME } from 'config/constants';

import { AttributeValue } from 'aws-sdk/clients/dynamodb';

class Collection<T> {
  public static DynamoDB: AWS.DynamoDB;
  public static Client: AWS.DynamoDB.DocumentClient;
  public static TableName: string;
  public Prefix: string;

  public Attributes: T;

  constructor(prefix: string) {
    Collection.DynamoDB = DynamoDB;
    Collection.Client = Client;
    Collection.TableName = TABLE_NAME;
    this.Prefix = prefix;
  }

  public static transformParameters(
    data: any
  ): { [key: string]: AttributeValue } {
    return data as any;
  }
}

export default Collection;
