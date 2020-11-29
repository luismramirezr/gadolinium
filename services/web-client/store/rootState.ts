import { INITIAL_STATE as alert } from './Alert';

export interface RootState {
  alert: typeof alert;
}

const initialState: RootState = {
  alert,
};

export default initialState;
