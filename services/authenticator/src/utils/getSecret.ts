import s3 from 'services/s3';
import { SECRET_KEY, S3_SECRETS_BUCKET } from 'config/constants';

const getSecret = async () => {
  const keyFile = await s3
    .getObject({
      Bucket: S3_SECRETS_BUCKET,
      Key: SECRET_KEY,
    })
    .promise();

  if (!keyFile.Body) throw new Error('Key not found');

  return keyFile.Body as Buffer;
};

export default getSecret;
