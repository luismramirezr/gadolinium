import { tableLayout } from 'config/database';
import { Collection } from 'dynaglue';
import Model from 'database/Model';

export interface User {
  _id: string;
  name: string;
  email: string;
}

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

export default new Model<User>(userCollection);
