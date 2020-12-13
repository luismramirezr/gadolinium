import fetch from 'node-fetch';
import { URLSearchParams } from 'url';
import { PAYMENT_SERVICE } from '~/config/constants';

import { createToken } from './authenticator';

export const notifications = async (data: any): Promise<any> => {
  const { apiKey: key } = await createToken();

  const qs = new URLSearchParams({ key });

  return fetch(`${PAYMENT_SERVICE}/notifications?${qs}`, {
    method: 'post',
    body: JSON.stringify(data),
  }).then((res) => res.json());
};
