import createState from 'store/util/createState';
import { AuthenticationState } from './types';
import { FetchStatus } from '../util/fetchStatus';
import { AuthenticationAction } from './actions';

export const INITIAL_STATE = createState<AuthenticationState>({
  fetchStatus: FetchStatus.notFetched,
  fetchSession: FetchStatus.notFetched,
  checkedSession: false,
  isAuth: false,
  admin: null,
});

const authenticationReducer = (
  state = INITIAL_STATE,
  action: AuthenticationAction
) => {
  switch (action.type) {
    case 'Authentication/FETCH_AUTHENTICATION_REQUEST':
      return state.set('fetchStatus', FetchStatus.fetching);
    case 'Authentication/FETCH_AUTHENTICATION_SUCCESS':
      return state.merge({
        fetchStatus: FetchStatus.fetched,
        isAuth: true,
        admin: action.payload,
      });
    case 'Authentication/FETCH_AUTHENTICATION_FAILURE':
      return state.set('fetchStatus', FetchStatus.errorFetching);
    case 'Authentication/FETCH_CHECK_AUTHENTICATION_REQUEST':
      return state.set('fetchSession', FetchStatus.fetching);
    case 'Authentication/FETCH_CHECK_AUTHENTICATION_SUCCESS':
      return state.merge({
        fetchSession: FetchStatus.fetched,
        checkedSession: true,
        isAuth: action.payload.isAuth,
        admin: action.payload.admin,
      });
    case 'Authentication/FETCH_CHECK_AUTHENTICATION_FAILURE':
      return state.merge({
        fetchSession: FetchStatus.errorFetching,
        checkedSession: true,
      });
    case 'Authentication/SIGN_OUT_SUCCESS':
      return state.merge({
        isAuth: false,
        admin: null,
      });
    default:
      return state;
  }
};

export default authenticationReducer;
