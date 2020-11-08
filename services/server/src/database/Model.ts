import dynamoose from 'dynamoose';
import { Document } from 'dynamoose/dist/Document';
import { ModelType } from 'dynamoose/dist/General';
import { Schema } from 'dynamoose/dist/Schema';

class Model<T> {
  public database: ModelType<Document>;

  public schema: Schema;

  private id: keyof T;

  private type: string;

  constructor(schema: Schema, id: keyof T, type: string) {
    this.schema = schema;
    this.id = id;
    this.type = type;
    this.database = dynamoose.model('GADOLINIUM');
  }

  public async create(data: any) {
    return this.database.create({
      _id: data[this.id],
      _type: this.type,
      data,
    }) as Promise<{ data: T } & Document>;
  }

  public async find(data: any) {
    return this.database.get({
      _id: data,
      _type: this.type,
    }) as Promise<({ data: T } & Document) | undefined>;
  }

  public async findOrFail(data: any) {
    const response = await this.find(data);
    if (!response) {
      throw Error(
        JSON.stringify({
          code: 404,
          message: `Model with id ${data} does not exist`,
        })
      );
    }
    return response as { data: T } & Document;
  }
}

export default Model;
