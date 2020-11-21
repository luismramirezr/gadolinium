import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Collection from 'database/Collection';
import { SALT, JWT_EXPIRATION } from 'config/constants';

import {
  PutItemInput,
  AttributeValue,
  GetItemInput,
} from 'aws-sdk/clients/dynamodb';

import { Admin as IAdmin, ROLE_ADMIN } from 'types/models';
import HttpError from '~/utils/HttpError';
import getRsaKey from '~/utils/getRsaKey';

export interface CreateAdminInput extends IAdmin {
  password: string;
}

class Admin extends Collection<IAdmin> {
  constructor(prefix: string) {
    super(prefix);
  }

  public getKey(email: string): AttributeValue {
    return `${this.Prefix}#${email}` as any;
  }

  public async createAdmin(data: CreateAdminInput): Promise<IAdmin> {
    const PK = this.getKey(data.email);
    const hashedPassword = bcrypt.hashSync(data.password, SALT);
    const input = {
      ...data,
      hashedPassword,
      password: undefined,
      role: 'ADMIN' as ROLE_ADMIN,
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
    };
  }

  public async getAdmin(email: string): Promise<{ Item?: IAdmin }> {
    const PK = this.getKey(email);
    const parameters: GetItemInput = {
      TableName: Collection.TableName,
      Key: {
        PK,
        SK: PK,
      },
    };

    const admin = await Collection.Client.get(parameters).promise();
    return admin as any;
  }

  public async signIn(
    email: string,
    password: string
  ): Promise<{
    admin: IAdmin;
    tokens: {
      sessionToken: string;
      refreshToken: string;
      verificationToken: string;
    };
  }> {
    const admin = (await this.getAdmin(email)) as { Item?: IAdmin };
    if (!admin.Item) throw new HttpError('Unauthorized', 403);

    const isPasswordValid = bcrypt.compareSync(
      password,
      admin.Item.hashedPassword || ''
    );

    if (!isPasswordValid) throw new HttpError('Unauthorized', 403);

    const rsa = await getRsaKey();

    const sessionToken = jwt.sign(
      { ...admin.Item, hashedPassword: undefined },
      rsa,
      {
        expiresIn: JWT_EXPIRATION,
      }
    );
    const refreshToken = jwt.sign(
      { ...admin.Item, hashedPassword: undefined },
      rsa
    );
    const verificationToken = jwt.sign(sessionToken, rsa);

    return {
      admin: { ...admin.Item, hashedPassword: undefined },
      tokens: { sessionToken, refreshToken, verificationToken },
    };
  }
}

export default new Admin('ADMIN');
