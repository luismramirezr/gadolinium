import dynamoose from 'dynamoose';
import { Document } from 'dynamoose/dist/Document';
import { ModelType } from 'dynamoose/dist/General';
import { Schema } from 'dynamoose/dist/Schema';

class Model<T> {
  public database: ModelType<Document>;

  public schema: Schema;

  private id: keyof T;

  private type: string;

  private hideFields: Array<keyof T> | undefined;

  private setters: Partial<{ [K in keyof T]: Function }> | undefined;

  constructor(
    schema: Schema,
    id: keyof T,
    type: string,
    hideFields?: Array<keyof T>,
    setters?: Partial<{ [K in keyof T]: Function }>
  ) {
    this.schema = schema;
    this.id = id;
    this.type = type;
    this.hideFields = hideFields;
    this.setters = setters;
    this.database = dynamoose.model('GADOLINIUM');
  }

  private async isUnique(id: string) {
    console.log('id', id);
    const exists = await this.find(id);
    return !exists;
  }

  private removeFields(data: any) {
    Object.keys(data).forEach((key) => {
      if (key.startsWith('_')) delete data[key];
    });
    if (this.hideFields)
      this.hideFields.forEach((field) => delete data.data[field]);
    return data;
  }

  private setValues(data: any) {
    if (!this.setters) return data;
    Object.keys(data).forEach((key) => {
      if (this.setters && this.setters[key as keyof T])
        data[key] = this.setters[key as keyof T]!(data[key]);
    });
    return data;
  }

  public async create(data: any) {
    const withValues = this.setValues(data);
    const isUnique = await this.isUnique(withValues[this.id]);
    console.log('unique', isUnique);
    if (!isUnique) {
      throw Error(
        JSON.stringify({
          statusCode: 422,
          message: `Model with id ${withValues[this.id]} already exist`,
        })
      );
    }
    const result = (await this.database.create({
      _id: data[this.id],
      _type: this.type,
      data: withValues,
    })) as { data: T } & Document;
    return this.removeFields(result);
  }

  public async find(data: any) {
    const result = (await this.database.get({
      _id: data,
      _type: this.type,
    })) as ({ data: T } & Document) | undefined;
    if (result) return this.removeFields(result);
    return result;
  }

  public async findOrFail(data: any) {
    const response = await this.find(data);
    if (!response) {
      throw Error(
        JSON.stringify({
          statusCode: 404,
          message: `Model with id ${data} does not exist`,
        })
      );
    }
    return response as { data: T } & Document;
  }
}

export default Model;
