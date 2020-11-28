import totp from 'totp-generator';

import { APIGatewayProxyHandler } from 'aws-lambda';
import getSecret from 'utils/getSecret';

export const create: APIGatewayProxyHandler = async () => {
  const secretBuffer = await getSecret();
  const secret = secretBuffer.toString();

  const apiKey = totp(secret);

  return {
    statusCode: 200,
    body: JSON.stringify({ apiKey }),
  };
};

export const validate: APIGatewayProxyHandler = async (event) => {
  const parsedBody = JSON.parse(event.body || '');
  const { key } = parsedBody;

  if (!key)
    return {
      statusCode: 404,
      body: 'No key',
    };

  const secretBuffer = await getSecret();
  const secret = secretBuffer.toString();

  const toptKey = totp(secret);

  const isValid = toptKey === key;

  if (!isValid)
    return {
      statusCode: 404,
      body: 'Not valid',
    };
  return {
    statusCode: 200,
    body: '',
  };
};
