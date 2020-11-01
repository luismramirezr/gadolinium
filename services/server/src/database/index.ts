import { DynamoDB } from 'aws-sdk';
import initializeModels from 'database/initializeModels';

import Model from './Model';
import { DynaglueContext } from 'dynaglue/dist/context/context_types';

const options =
  process.env.NODE_ENV === 'development'
    ? {
        endpoint: 'http://dynamodb-local:8000',
      }
    : {};

export const dynamodb = new DynamoDB(options);

class Database {
  private static instance: DynaglueContext;

  private constructor() {
    return new Database();
  }

  public static async getInstance(
    tableSchema: DynamoDB.CreateTableInput,
    models: Array<Model>
  ) {
    if (!Database.instance) {
      Database.instance = await Database.initializeDatabase(
        tableSchema,
        models
      );
    }
    return Database.instance;
  }

  private static async initializeDatabase(
    tableSchema: DynamoDB.CreateTableInput,
    models: Array<Model>
  ) {
    const TableName = process.env.TABLE_NAME!;
    try {
      const description = await dynamodb.describeTable({ TableName }).promise();
      if (!description) {
        throw new Error(`Table ${TableName} does not exist`);
      }
      console.log(`Table ${TableName} already exists and will not be created`);
    } catch (e) {
      console.log(`Table ${TableName} does not exist and will be created`);
      await dynamodb.createTable(tableSchema).promise();
      console.log(`Table ${TableName} created`);
    }
    return initializeModels(dynamodb, models);
  }
}

export default Database.getInstance;
