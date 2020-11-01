import { Collection, find, findChildren, insert } from 'dynaglue';
import { Context } from 'dynaglue/dist/context';
import { FindQuery } from 'dynaglue/dist/operations/find';

class Model {
  public collection: Collection;

  public context: Context;

  constructor(data: Collection) {
    this.collection = data;
  }

  initialize(ctx: Context) {
    this.context = ctx;
  }

  async find(query: FindQuery) {
    return find(this.context, this.collection.name, query);
  }

  async create(value: object) {
    return insert(this.context, this.collection.name, value);
  }

  async findChildren(value: string) {
    return findChildren(this.context, this.collection.name, value);
  }
}

export default Model;
