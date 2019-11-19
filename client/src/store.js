import { applyMiddleware, createStore } from 'redux';
import reducers from './reducers';

import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

const middleware = applyMiddleware(thunk, promise);

const store = createStore(reducers, {}, middleware);

export default store;
