import fetch from 'node-fetch';
import { AUTHENTICATOR_URL } from '~/config/constants';

export const verifyToken = async (key: string): Promise<boolean> =>
  fetch(AUTHENTICATOR_URL, {
    method: 'post',
    body: JSON.stringify({ key }),
  })
    .then((res) => res.status)
    .then((status) => status === 200);
