import { notifications } from '~/services/paymentService';
import { parse } from './utils/decodeFormUrlEncoded';

import { APIGatewayProxyHandler } from 'aws-lambda';

export const notification: APIGatewayProxyHandler = async (event) => {
  const { body } = event;

  if (!body)
    return {
      statusCode: 400,
      body: 'Empty body',
    };

  const parsed = parse(body);
  const response = await notifications(parsed);
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};
