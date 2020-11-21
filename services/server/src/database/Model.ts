import dynamoose from 'dynamoose';
import { Document } from 'dynamoose/dist/Document';
import { ModelType } from 'dynamoose/dist/General';
import { Schema } from 'dynamoose/dist/Schema';
import ValidationError from '~/utils/ValidationError';

class Model<T> {
  public database: ModelType<Document>;

  public schema: Schema;

  private id: keyof T;

  private type: string;

  public hideFields: Array<keyof T> | undefined;

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
    this.setters = setters;
    this.hideFields = hideFields;
    this.database = dynamoose.model('GADOLINIUM');
  }

  private async isUnique(id: string) {
    console.log('id', id);
    const exists = await this.find(id);
    return !exists;
  }

  public removeFields(data: any) {
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

  public async create(data: any, withHidden = false) {
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
    return withHidden ? result : this.removeFields(result);
  }

  public async find(data: any, withHidden = false) {
    const result = (await this.database.get({
      _id: data,
      _type: this.type,
    })) as ({ data: T } & Document) | undefined;
    if (result && !withHidden) return this.removeFields(result);
    return result;
  }

  public async findOrFail(data: any, withHidden = false) {
    const response = await this.find(data, withHidden);
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

  public validationError(message: any) {
    throw new ValidationError(message);
  }
}

export default Model;
