import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Collection from 'database/Collection';
import { SALT, JWT_EXPIRATION } from 'config/constants';

import {
  PutItemInput,
  AttributeValue,
  GetItemInput,
  QueryInput,
} from 'aws-sdk/clients/dynamodb';

import {
  Customer as ICustomer,
  Order,
  ROLE_CUSTOMER,
  WithGSI,
  WithKeys,
} from 'types/models';
import HttpError from 'utils/HttpError';
import getRsaKey from 'utils/getRsaKey';

export interface CreateCustomerInput extends ICustomer {
  password: string;
}

class Customer extends Collection<ICustomer> {
  constructor(prefix: string) {
    super(prefix);
  }

  public getKey(email: string): AttributeValue {
    return `${this.Prefix}#${email}` as any;
  }

  public async createCustomer(
    data: CreateCustomerInput
  ): Promise<ICustomer & WithKeys & WithGSI> {
    const PK = this.getKey(data.email);
    const hashedPassword = bcrypt.hashSync(data.password, SALT);
    const input = {
      ...data,
      hashedPassword,
      password: undefined,
      role: 'CUSTOMER' as ROLE_CUSTOMER,
    };
    const transformedParameters = Collection.transformParameters(input);

    const parameters: PutItemInput = {
      TableName: Collection.TableName,
      Item: {
        ...transformedParameters,
        PK,
        SK: PK,
      },
      ConditionExpression: 'attribute_not_exists(PK)',
    };
    await Collection.Client.put(parameters).promise();
    return {
      ...input,
      hashedPassword: undefined,
    } as any;
  }

  public async getCustomer(
    email: string
  ): Promise<ICustomer & WithKeys & WithGSI> {
    const PK = this.getKey(email);
    const parameters: GetItemInput = {
      TableName: Collection.TableName,
      Key: {
        PK,
        SK: PK,
      },
    };
    const customer = await Collection.Client.get(parameters).promise();
    if (!customer.Item) throw new HttpError('Customer not found', 404);
    return customer.Item as any;
  }

  public async updateCustomer(
    data: ICustomer
  ): Promise<ICustomer & WithKeys & WithGSI> {
    const PK = this.getKey(data.email);
    const transformedParameters = Collection.transformParameters(data);
    const parameters: PutItemInput = {
      TableName: Collection.TableName,
      Item: {
        ...transformedParameters,
        PK,
        SK: PK,
      },
    };

    await Collection.Client.put(parameters).promise();
    return data as any;
  }

  public async signIn(
    email: string,
    password: string
  ): Promise<{
    customer: ICustomer;
    tokens: {
      sessionToken: string;
      refreshToken: string;
      verificationToken: string;
    };
  }> {
    const customer = await this.getCustomer(email);
    if (!customer) throw new HttpError('Unauthorized', 403);

    const isPasswordValid = bcrypt.compareSync(
      password,
      customer.hashedPassword || ''
    );

    if (!isPasswordValid) throw new HttpError('Unauthorized', 403);

    const rsa = await getRsaKey();

    const sessionToken = jwt.sign(
      { ...customer, hashedPassword: undefined },
      rsa,
      {
        expiresIn: JWT_EXPIRATION,
      }
    );
    const refreshToken = jwt.sign(
      { ...customer, hashedPassword: undefined },
      rsa
    );
    const verificationToken = jwt.sign(sessionToken, rsa);

    return {
      customer: { ...customer, hashedPassword: undefined },
      tokens: { sessionToken, refreshToken, verificationToken },
    } as any;
  }

  public async getCustomerOrders(
    email: string
  ): Promise<{
    customer: ICustomer & WithKeys & WithGSI;
    orders: Array<Order>;
  }> {
    const PK = this.getKey(email);
    const parameters: QueryInput = {
      TableName: Collection.TableName,
      KeyConditionExpression: 'PK = :pk',
      ExpressionAttributeValues: {
        ':pk': PK,
      },
    };
    const customer = await Collection.Client.query(parameters).promise();

    if (customer.Items)
      return {
        customer: customer.Items.shift() as any,
        orders: customer.Items as any,
      } as any;

    throw new HttpError('Customer not found', 404);
  }
}

export default new Customer('CUSTOMER');
