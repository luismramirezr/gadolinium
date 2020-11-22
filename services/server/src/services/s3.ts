import AWS from 'aws-sdk';
import { S3_BUCKET, S3_ENDPOINT } from 'config/constants';

const endpoint = S3_ENDPOINT;
const s3ForcePathStyle = process.env.NODE_ENV !== 'PRODUCTION';

const s3 = new AWS.S3({
  endpoint,
  s3ForcePathStyle,
});

export const getSignedUrl = (Key: string) =>
  s3.getSignedUrl('getObject', {
    Bucket: S3_BUCKET,
    Key,
  });

export default s3;
