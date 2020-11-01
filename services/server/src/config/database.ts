import { DynamoDB } from 'aws-sdk';
import { CollectionLayout } from 'dynaglue';

export const tableLayout: CollectionLayout = {
  tableName: process.env.TABLE_NAME!,
  primaryKey: {
    partitionKey: 'pk0',
    sortKey: 'sk0',
  },
  findKeys: [
    {
      indexName: 'gs1',
      partitionKey: 'gspk1',
      sortKey: 'gssk1',
    },
  ],
};

export const tableSchema: DynamoDB.CreateTableInput = {
  TableName: process.env.TABLE_NAME!,
  KeySchema: [
    {
      AttributeName: 'pk0',
      KeyType: 'HASH',
    },
    {
      AttributeName: 'sk0',
      KeyType: 'RANGE',
    },
  ],
  AttributeDefinitions: [
    {
      AttributeName: 'pk0',
      AttributeType: 'S',
    },
    {
      AttributeName: 'sk0',
      AttributeType: 'S',
    },
    {
      AttributeName: 'gspk1',
      AttributeType: 'S',
    },
    {
      AttributeName: 'gssk1',
      AttributeType: 'S',
    },
  ],
  BillingMode: 'PAY_PER_REQUEST',
  GlobalSecondaryIndexes: [
    {
      IndexName: 'gs1',
      KeySchema: [
        {
          AttributeName: 'gspk1',
          KeyType: 'HASH',
        },
        {
          AttributeName: 'gssk1',
          KeyType: 'RANGE',
        },
      ],
      Projection: {
        ProjectionType: 'ALL',
      },
    },
  ],
};
