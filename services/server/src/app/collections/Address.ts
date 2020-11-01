import { tableLayout } from 'config/database';
import { Collection } from 'dynaglue';
import Model from 'database/Model';

const addressCollection: Collection = {
  type: 'child',
  name: 'addresses',
  layout: tableLayout,
  parentCollectionName: 'users',
  foreignKeyPath: ['userId'],
  accessPatterns: [
    {
      indexName: 'gs1',
      partitionKeys: [['country']],
      sortKeys: [['state'], ['town'], ['street']],
    },
  ],
};

export default new Model(addressCollection);
