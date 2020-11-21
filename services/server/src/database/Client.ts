import AWS from 'aws-sdk';
import { CreateTableInput } from 'aws-sdk/clients/dynamodb';
import { DYNAMODB_ENDPOINT, TABLE_NAME } from 'config/constants';

const endpoint = DYNAMODB_ENDPOINT;

export const DynamoDB = new AWS.DynamoDB({
  endpoint,
});

export const Client = new AWS.DynamoDB.DocumentClient({
  endpoint,
});

export const TableSchema: CreateTableInput = {
  TableName: TABLE_NAME,
  KeySchema: [
    { AttributeName: 'PK', KeyType: 'HASH' },
    { AttributeName: 'SK', KeyType: 'RANGE' },
  ],
  AttributeDefinitions: [
    { AttributeName: 'PK', AttributeType: 'S' },
    { AttributeName: 'SK', AttributeType: 'S' },
  ],
  BillingMode: 'PAY_PER_REQUEST',
};
