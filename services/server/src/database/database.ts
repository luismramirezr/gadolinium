import dynamoose from 'dynamoose';
import { DocumentObjectFromSchemaSettings } from 'dynamoose/dist/Document';
import { ModelOptions } from 'dynamoose/dist/Model';
import { Schema, SchemaDefinition } from 'dynamoose/dist/Schema';
import { ulid } from 'ulid';

dynamoose.logger.providers.set(console);

if (process.env.NODE_ENV === 'development') {
  dynamoose.aws.ddb.local('http://dynamodb-local:8000');
}

export const createSchema = (
  schema: SchemaDefinition,
  options?: DocumentObjectFromSchemaSettings
) => {
  return new dynamoose.Schema(
    {
      _id: {
        type: String,
        default: () => ulid(),
        hashKey: true,
      },
      _type: {
        type: String,
        enum: ['CUSTOMER', 'ADMIN'],
        required: true,
      },
      ...schema,
    },
    {
      saveUnknown: false,
      timestamps: true,
      ...options,
    }
  );
};

export const createModels = (
  schemas: Array<Schema>,
  modelOptions?: Partial<ModelOptions>
) => {
  try {
    return dynamoose.model('GADOLINIUM', schemas, {
      create: true,
      throughput: 'ON_DEMAND',
      ...modelOptions,
    });
  } catch (e) {
    console.log(e);
  }
};
