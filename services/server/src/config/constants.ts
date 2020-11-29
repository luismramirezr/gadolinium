export const NODE_ENV = process.env.NODE_ENV;
export const APP_NAME = process.env.APP_NAME;
export const API_URL = process.env.API_URL;

export const PAPERTRAIL_HOST = process.env.PAPERTRAIL_HOST;
export const PAPERTRAIL_PORT = process.env.PAPERTRAIL_PORT;

export const SALT = process.env.SALT;
export const COOKIE_SECRET = process.env.COOKIE_SECRET;
export const RSA_KEY = process.env.RSA_KEY!;
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION!;
export const COOKIE_OPTIONS = {
  maxAge: Number(process.env.COOKIE_MAX_AGE),
  httpOnly: true,
  signed: true,
};

export const TABLE_NAME = process.env.TABLE_NAME!;
export const DYNAMODB_ENDPOINT = process.env.DYNAMODB_ENDPOINT;

export const S3_ENDPOINT = process.env.S3_ENDPOINT;
export const S3_BUCKET = process.env.S3_BUCKET!;
export const S3_SECRETS_BUCKET = process.env.S3_SECRETS_BUCKET!;

export const AUTHENTICATOR_URL = process.env.AUTHENTICATOR_URL || '';
