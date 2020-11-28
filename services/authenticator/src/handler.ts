import getSecret from 'utils/getSecret';
import { getToken, verifyToken } from 'utils/totp';
import { APIGatewayProxyHandler } from 'aws-lambda';

export const create: APIGatewayProxyHandler = async () => {
  const secretBuffer = await getSecret();
  const secret = secretBuffer.toString();

  const apiKey = getToken(secret);

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
      body: 'NoKey',
    };

  const secretBuffer = await getSecret();
  const secret = secretBuffer.toString();

  const isValid = verifyToken(secret, key);

  if (!isValid)
    return {
      statusCode: 404,
      body: 'NotValid',
    };
  return {
    statusCode: 200,
    body: '',
  };
};
