import { tableLayout } from 'config/database';
import { Collection } from 'dynaglue';
import Model from 'database/Model';

const addressCollection: Collection = {
  type: 'child',
  name: 'products',
  layout: tableLayout,
  parentCollectionName: 'categories',
  foreignKeyPath: ['productId'],
};

export default new Model(addressCollection);
