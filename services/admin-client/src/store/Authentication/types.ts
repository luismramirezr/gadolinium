import { FetchStatus } from 'store/util/fetchStatus';
import { Admin } from 'types/models';

export interface AuthenticationState {
  fetchStatus: FetchStatus;
  fetchSession: FetchStatus;
  isAuth: boolean;
  checkedSession: boolean;
  admin: Admin | null;
}
