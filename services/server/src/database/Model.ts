import { Collection, find, findChildren, insert } from 'dynaglue';
import { Context } from 'dynaglue/dist/context';
import { FindQuery } from 'dynaglue/dist/operations/find';

class Model<T> {
  public collection: Collection;

  public context: Context;

  constructor(data: Collection) {
    this.collection = data;
  }

  initialize(ctx: Context) {
    this.context = ctx;
  }

  async find(query: FindQuery) {
    const data = await find(this.context, this.collection.name, query);
    if (!data.items.length) return null;
    const item = data.items.pop() as unknown;
    return item as T;
  }

  async findOrFail(query: FindQuery) {
    const data = await this.find(query);
    if (!data)
      throw new Error(
        `Item for collection ${this.collection.name} not found.
        Query: ${JSON.stringify(query, null, 2)}`
      );
    return data;
  }

  async findAll(query: FindQuery) {
    const data = await find(this.context, this.collection.name, query);
    const items = data.items.map((item) => item as unknown) as Array<T>;
    return { ...query, items };
  }

  async create(value: object) {
    return insert(this.context, this.collection.name, value);
  }

  async findChildren(value: string) {
    return findChildren(this.context, this.collection.name, value);
  }
}

export default Model;
