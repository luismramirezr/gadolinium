import { INITIAL_STATE as alerts } from './Alert';
import { INITIAL_STATE as authentication } from './Authentication';
import { INITIAL_STATE as categories } from './Categories';

export interface RootState {
  alerts: typeof alerts;
  authentication: typeof authentication;
  categories: typeof categories;
}

const initialState: RootState = {
  alerts,
  authentication,
  categories,
};

export default initialState;
