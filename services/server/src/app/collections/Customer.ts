import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Collection from 'database/Collection';
import { SALT, JWT_EXPIRATION } from 'config/constants';

import {
  PutItemInput,
  AttributeValue,
  GetItemInput,
  QueryInput,
  DeleteItemInput,
  TransactWriteItemsInput,
  UpdateItemInput,
} from 'aws-sdk/clients/dynamodb';

import {
  Customer as ICustomer,
  File as IFile,
  Order,
  ROLE_CUSTOMER,
  WithGSI,
  WithKeys,
} from 'types/models';
import HttpError from 'utils/HttpError';
import getRsaKey from 'utils/getRsaKey';
import File from './File';

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

  public async removeAvatar(PK: string, file?: string) {
    console.log(file);
    if (file) {
      const parameters: TransactWriteItemsInput = {
        TransactItems: [
          {
            Delete: {
              TableName: Collection.TableName,
              Key: {
                PK: `FILE#${file}` as AttributeValue,
                SK: `FILE#${file}` as AttributeValue,
              },
            },
          },
          {
            Delete: {
              TableName: Collection.TableName,
              Key: {
                PK: PK as AttributeValue,
                SK: `#FILE#${file}` as AttributeValue,
              },
            },
          },
          {
            Update: {
              TableName: Collection.TableName,
              Key: {
                PK: PK as AttributeValue,
                SK: PK as AttributeValue,
              },
              UpdateExpression: 'SET avatar = :avatar',
              ExpressionAttributeValues: {
                ':avatar': '' as AttributeValue,
              },
            },
          },
        ],
      };
      await Collection.Client.transactWrite(parameters).promise();
      return File.deleteFileFromS3(file);
    }
    const parameters: UpdateItemInput = {
      TableName: Collection.TableName,
      Key: {
        PK: PK as AttributeValue,
        SK: PK as AttributeValue,
      },
      UpdateExpression: 'SET avatar = :avatar',
      ExpressionAttributeValues: {
        ':avatar': '' as AttributeValue,
      },
    };
    return Collection.Client.update(parameters).promise();
  }

  public async setAvatar(PK: string, file: IFile & WithKeys & { url: string }) {
    const parameters: TransactWriteItemsInput = {
      TransactItems: [
        {
          Put: {
            TableName: Collection.TableName,
            Item: {
              ...Collection.transformParameters(file),
              PK: PK as AttributeValue,
              SK: `#${file.PK}` as AttributeValue,
            },
          },
        },
        {
          Update: {
            TableName: Collection.TableName,
            Key: {
              PK: PK as AttributeValue,
              SK: PK as AttributeValue,
            },
            UpdateExpression: 'SET avatar = :avatar',
            ExpressionAttributeValues: {
              ':avatar': file.key as AttributeValue,
            },
          },
        },
      ],
    };
    await Collection.Client.transactWrite(parameters).promise();
    return true;
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
    email: string,
    usePK = false
  ): Promise<ICustomer & WithKeys & WithGSI> {
    const PK = usePK ? (email as AttributeValue) : this.getKey(email);
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
        role: 'CUSTOMER' as AttributeValue,
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

  public async getCustomerOrders(email: string): Promise<Array<Order>> {
    const PK = this.getKey(email);
    const parameters: QueryInput = {
      TableName: Collection.TableName,
      KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
      ExpressionAttributeValues: {
        ':pk': PK,
        ':sk': '#ORDER' as AttributeValue,
      },
      ScanIndexForward: false,
    };
    const orders = await Collection.Client.query(parameters).promise();

    if (orders.Items) return orders.Items as any;

    throw new HttpError('Customer not found', 404);
  }
}

export default new Customer('CUSTOMER');
