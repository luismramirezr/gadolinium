import api, { parseError } from 'services/api';
import { Admin } from 'types/models';

export interface SignInPayload {
  admin: Admin;
  tokens: {
    verificationToken: string;
    refreshToken: string;
  };
}

export interface CheckSessionPayload {
  isAuth: boolean;
  admin: Admin;
}

export const signIn = (
  email: string,
  password: string,
  saveSession: boolean
): Promise<SignInPayload> =>
  api
    .post(
      '/sessions',
      { email, password, saveSession, asAdmin: true },
      { withCredentials: true }
    )
    .then(response => response.data)
    .catch(parseError);

export const checkSession = (): Promise<CheckSessionPayload> =>
  api
    .get('/sessions', {
      withCredentials: true,
    })
    .then(response => response.data);
