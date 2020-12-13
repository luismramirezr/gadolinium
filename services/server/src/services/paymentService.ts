import fetch from 'node-fetch';
import { URLSearchParams } from 'url';
import { PAYMENT_SERVICE_URL } from '~/config/constants';

import {
  GetPaymentPayloadData,
  PagSeguroTransaction,
} from 'types/gateway/pagseguro';

import { createToken } from './authenticator';
import HttpError from '~/utils/HttpError';

export const makePayment = async (
  data: GetPaymentPayloadData
): Promise<{ transaction: PagSeguroTransaction }> => {
  const { apiKey: key } = await createToken();

  const qs = new URLSearchParams({ key });

  return fetch(`${PAYMENT_SERVICE_URL}/payments?${qs}`, {
    method: 'post',
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.status === 201) return await res.json();
    const error = await res.json();
    throw new HttpError(error, res.status);
  });
};
