import { combineReducers } from 'redux';

import alert from './Alert';
import authentication from './Authentication';

export default combineReducers({
  alert,
  authentication,
});
