import { APIGatewayProxyHandler } from 'aws-lambda';
import { verifyToken } from './services/authenticator';
import PagSeguro from './services/pagseguro';

export const createSession: APIGatewayProxyHandler = async (event) => {
  const { key } = (event.queryStringParameters as { key?: string }) || {};
  if (!key)
    return {
      statusCode: 404,
      body: '',
    };

  const isTokenValid = await verifyToken(key);

  if (!isTokenValid)
    return {
      statusCode: 404,
      body: '',
    };

  const session = await PagSeguro.getSession();
  return {
    statusCode: 201,
    body: JSON.stringify(session),
  };
};

export const createPayment: APIGatewayProxyHandler = async (event) => {
  const { key } = (event.queryStringParameters as { key?: string }) || {};
  if (!key)
    return {
      statusCode: 404,
      body: '',
    };

  const isTokenValid = await verifyToken(key);

  if (!isTokenValid)
    return {
      statusCode: 404,
      body: '',
    };

  const parsedBody = JSON.parse(event.body || '');

  const payment = await PagSeguro.makePayment({
    data: parsedBody,
    print: true,
  });

  return {
    statusCode: 201,
    body: JSON.stringify(payment),
  };
};
