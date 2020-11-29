import { AnyAction } from 'redux';
import { action, ActionType } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { RootState } from 'store/rootState';
import { createAlert } from 'store/Alert/actions';
import * as api from 'services/api/authentication';
import {
  saveLocalStorageItem,
  removeLocalStorageItem,
  isLocaltStorageItemSet,
} from 'utils/localStorage';
import { injectToken, removeToken } from 'services/api';
import { Customer } from 'types/models';

export const fetchAuthenticationRequest = () =>
  action('Authentication/FETCH_AUTHENTICATION_REQUEST');

export const fetchAuthenticationSuccess = (payload: Customer) =>
  action('Authentication/FETCH_AUTHENTICATION_SUCCESS', payload);

export const fetchAuthenticationFailure = () =>
  action('Authentication/FETCH_AUTHENTICATION_FAILURE');

export const fetchCheckAuthenticationRequest = () =>
  action('Authentication/FETCH_CHECK_AUTHENTICATION_REQUEST');

export const fetchCheckAuthenticationSuccess = (payload: {
  customer: Customer | null;
  isAuth: boolean;
}) => action('Authentication/FETCH_CHECK_AUTHENTICATION_SUCCESS', payload);

export const fetchCheckAuthenticationFailure = () =>
  action('Authentication/FETCH_CHECK_AUTHENTICATION_FAILURE');

export const signOutSuccess = () => action('Authentication/SIGN_OUT_SUCCESS');

export const signIn = ({
  email,
  password,
  saveSession,
}: {
  email: string;
  password: string;
  saveSession: boolean;
}): ThunkAction<void, RootState, undefined, AnyAction> => async (dispatch) => {
  dispatch(fetchAuthenticationRequest());
  try {
    const result = await api.signIn(email, password, saveSession);
    const { customer, tokens } = result;
    injectToken(tokens.verificationToken);
    if (saveSession)
      saveLocalStorageItem('verificationToken', tokens.verificationToken);
    dispatch(fetchAuthenticationSuccess(customer));
  } catch (e) {
    dispatch(
      createAlert({ content: 'E-mail e/ou senha incorretos', type: 'error' })
    );
    dispatch(fetchAuthenticationFailure());
  }
};

export const checkSession = (): ThunkAction<
  void,
  RootState,
  undefined,
  AnyAction
> => async (dispatch) => {
  if (!isLocaltStorageItemSet('verificationToken')) {
    dispatch(fetchCheckAuthenticationFailure());
    return;
  }
  dispatch(fetchCheckAuthenticationRequest());
  try {
    const result = await api.checkSession();
    const { isAuth, customer } = result;
    dispatch(fetchCheckAuthenticationSuccess({ isAuth, customer }));
  } catch (e) {
    removeLocalStorageItem('verificationToken');
    dispatch(fetchCheckAuthenticationFailure());
  }
};

export const signOut = (): ThunkAction<
  void,
  RootState,
  undefined,
  AnyAction
> => (dispatch) => {
  removeLocalStorageItem('verificationToken');
  removeToken();
  dispatch(signOutSuccess());
};

export type AuthenticationAction =
  | ActionType<typeof fetchAuthenticationRequest>
  | ActionType<typeof fetchAuthenticationSuccess>
  | ActionType<typeof fetchAuthenticationFailure>
  | ActionType<typeof fetchCheckAuthenticationRequest>
  | ActionType<typeof fetchCheckAuthenticationSuccess>
  | ActionType<typeof fetchCheckAuthenticationFailure>
  | ActionType<typeof signOutSuccess>;
