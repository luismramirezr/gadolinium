import { FetchStatus } from 'store/util/fetchStatus';
import { Customer } from 'types/models';

export interface AuthenticationState {
  fetchStatus: FetchStatus;
  fetchSession: FetchStatus;
  isAuth: boolean;
  checkedSession: boolean;
  customer: Customer | null;
}
