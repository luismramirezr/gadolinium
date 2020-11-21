import s3 from 'services/s3';
import { RSA_KEY, S3_BUCKET } from 'config/constants';
import HttpError from 'utils/HttpError';

const getRsaKey = async () => {
  const keyFile = await s3
    .getObject({
      Bucket: S3_BUCKET,
      Key: RSA_KEY,
    })
    .promise();

  if (!keyFile.Body) throw new HttpError('Key not found', 500);

  return keyFile.Body as string;
};

export default getRsaKey;
