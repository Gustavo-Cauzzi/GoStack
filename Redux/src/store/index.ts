import { applyMiddleware, createStore } from 'redux';
import { ICartState } from './modules/cart/types';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

import createSagaMiddlewere from 'redux-saga';

export interface IState {
  cart: ICartState;
}

const sagaMiddleware = createSagaMiddlewere();

const middlewares = [sagaMiddleware];

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(...middlewares)
  ),
);

sagaMiddleware.run(rootSaga);

export default store;
