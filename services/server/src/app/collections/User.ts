import { tableLayout } from 'config/database';
import { Collection } from 'dynaglue';
import Model from 'database/Model';

const userCollection: Collection = {
  name: 'users',
  layout: tableLayout,
  accessPatterns: [
    {
      indexName: 'gs1',
      partitionKeys: [],
      sortKeys: [['email']],
    },
  ],
};

export default new Model(userCollection);
