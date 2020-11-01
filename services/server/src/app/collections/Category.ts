import { tableLayout } from 'config/database';
import { Collection } from 'dynaglue';
import Model from 'database/Model';

const addressCollection: Collection = {
  type: 'root',
  name: 'categories',
  layout: tableLayout,
};

export default new Model(addressCollection);
