import {combineReducers} from 'redux';

import {medidations} from './medidations/reducers';
import { reducer as form } from 'redux-form';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  medidations,
  form,
  router: routerReducer
});
