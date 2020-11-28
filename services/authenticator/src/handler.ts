import getSecret from 'utils/getSecret';
import { getToken } from 'utils/totp';
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
      body: 'No key',
    };

  const secretBuffer = await getSecret();
  const secret = secretBuffer.toString();

  const toptKey = getToken(secret);

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
