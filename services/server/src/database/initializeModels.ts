import { DynamoDB } from 'aws-sdk';
import { createContext } from 'dynaglue';
import Model from 'database/Model';

const initializeModels = (dynamodb: DynamoDB, models: Array<Model>) => {
  const collections = models.map((model) => model.collection);
  const db = createContext(dynamodb, collections);
  models.forEach((model) => model.initialize(db));
  return db;
};

export default initializeModels;
