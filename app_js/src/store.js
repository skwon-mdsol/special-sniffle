import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux';
import createHashHistory from 'history/createHashHistory';

import reducer from './reducers';

export const history = createHashHistory();
const middlewares = [
  thunk,
  routerMiddleware(history)
];

const enhancers = [
  applyMiddleware(...middlewares)
];

const composeEnhancers =
  (/^production$/.test(process.env.NODE_ENV) && compose) ||
  (window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose);

const store = createStore(reducer, {}, composeEnhancers(...enhancers));

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const nextReducers = require('./reducers');
    store.replaceReducer(nextReducers);
  });
}

export default store;
