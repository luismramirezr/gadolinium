import api, { parseError } from 'services/api';
import { Customer } from 'types/models';

export interface SignInPayload {
  customer: Customer;
  tokens: {
    verificationToken: string;
    refreshToken: string;
  };
}

export interface CheckSessionPayload {
  isAuth: boolean;
  customer: Customer;
}

export const signIn = (
  email: string,
  password: string,
  saveSession: boolean
): Promise<SignInPayload> =>
  api
    .post('/sessions', { email, password, saveSession })
    .then((response) => response.data)
    .catch(parseError);

export const checkSession = (): Promise<CheckSessionPayload> =>
  api
    .get('/sessions', {
      withCredentials: true,
    })
    .then((response) => response.data);
