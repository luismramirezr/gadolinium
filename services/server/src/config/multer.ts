import { extname } from 'path';
import multerS3 from 'multer-s3';
import { ulid } from 'ulid';

import s3 from 'services/s3';
import { S3_BUCKET } from './constants';

import { Request } from 'express';

export default {
  storage: multerS3({
    s3: s3 as any,
    bucket: S3_BUCKET,
    key: (_req: Request, file, cb) => {
      const id = ulid();
      const filename = `${id}${extname(file.originalname)}`;
      return cb(null, filename);
    },
    contentType: (_req: Request, file, cb) => cb(null, file.mimetype),
  }),
};
