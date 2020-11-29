import { INITIAL_STATE as alert } from './Alert';
import { INITIAL_STATE as authentication } from './Authentication';

export interface RootState {
  alert: typeof alert;
  authentication: typeof authentication;
}

const initialState: RootState = {
  alert,
  authentication,
};

export default initialState;
