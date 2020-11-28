import Collection from 'database/Collection';

import {
  AttributeValue,
  GetItemInput,
  PutItemInput,
} from 'aws-sdk/clients/dynamodb';

import { File as IFile, WithKeys } from 'types/models';
import HttpError from '~/utils/HttpError';
import { deleteFile, getSignedUrl } from '~/services/s3';

class File extends Collection<IFile> {
  constructor(prefix: string) {
    super(prefix);
  }

  public getUniqueKey(slug: string): AttributeValue {
    return `${this.Prefix}#${slug}` as any;
  }

  public async createFile(data: IFile): Promise<IFile> {
    const PK = this.getUniqueKey(data.key);
    const transformedParameters = Collection.transformParameters(data);

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
    return data;
  }

  public async getFile(
    slug: string
  ): Promise<IFile & WithKeys & { url: string }> {
    const PK = this.getUniqueKey(slug);
    const parameters: GetItemInput = {
      TableName: Collection.TableName,
      Key: {
        PK,
        SK: PK,
      },
    };
    const result = await Collection.Client.get(parameters).promise();
    if (!result.Item) throw new HttpError(`File '${slug}' not found`, 404);
    const url = getSignedUrl(result.Item.key);
    return { ...result.Item, url } as any;
  }

  public async deleteFileFromS3(key: string): Promise<void> {
    await deleteFile(key);
  }
}

export default new File('FILE');
