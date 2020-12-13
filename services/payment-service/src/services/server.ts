import fetch from 'node-fetch';
import { URLSearchParams } from 'url';
import { SERVER_URL } from '~/config/constants';

import { createToken } from './authenticator';

export const notifications = async (body: any): Promise<any> => {
  const { apiKey: key } = await createToken();

  const qs = new URLSearchParams({ key });

  return fetch(`${SERVER_URL}/internal/transactions?${qs}`, {
    method: 'post',
    body: JSON.stringify(body),
  }).then((res) => res.json());
};
