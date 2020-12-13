import { APIGatewayProxyHandler } from 'aws-lambda';
import { verifyToken } from 'services/authenticator';
import PagSeguro from 'services/pagseguro';
import { notifications } from 'services/server';

import { Notification, PagSeguroTransaction } from 'types/gateways/pagseguro';
import { NOTIFIER_URL } from 'config/constants';

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
    data: { ...parsedBody, notificationURL: `${NOTIFIER_URL}/notification` },
    print: true,
  });

  return {
    statusCode: 201,
    body: JSON.stringify(payment),
  };
};

export const notification: APIGatewayProxyHandler = async (event) => {
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

  const parsedBody: Notification = JSON.parse(event.body || '');

  const transaction: PagSeguroTransaction = await PagSeguro.getTransactionFromNotification(
    parsedBody.notificationCode
  );

  const response = await notifications(transaction);

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};
