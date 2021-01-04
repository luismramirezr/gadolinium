import { combineReducers } from 'redux';

import alerts from './Alert';
import authentication from './Authentication';
import categories from './Categories';

export default combineReducers({
  alerts,
  authentication,
  categories,
});
