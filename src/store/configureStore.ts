import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// Using require to avoid missing type declarations for redux-logger
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { createLogger }: any = require('redux-logger');
// Use require to safely resolve the saga middleware factory across module formats
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReduxSaga: any = require('redux-saga');
import AsyncStorage from '@react-native-community/async-storage';

import rootReducers from '../reducers'; // where reducers is a object of reducers
import sagas from '../sagas';

const config = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'presistReducer',
    'userReducer',
    'homeReducer',
    'appSettingsReducer',
  ],
  // blacklist: ['nav', 'loadingReducer'],
  debug: true, //to get useful logging
};

const middleware = [] as any[];
// Determine the factory function regardless of CJS/ESM interop
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sagaFactory: any =
  (typeof ReduxSaga === 'function' && ReduxSaga) ||
  (ReduxSaga && typeof ReduxSaga.default === 'function' && ReduxSaga.default) ||
  (ReduxSaga &&
    typeof ReduxSaga.createSagaMiddleware === 'function' &&
    ReduxSaga.createSagaMiddleware);

if (!sagaFactory) {
  throw new Error('Unable to resolve redux-saga middleware factory');
}
const sagaMiddleware = sagaFactory();

middleware.push(sagaMiddleware);

if (__DEV__) {
  middleware.push(createLogger());
}

const reducers = persistCombineReducers(config as any, rootReducers as any);
const enhancers = [applyMiddleware(...(middleware as any))] as any[];
// const initialState = {};
const store = createStore(
  reducers as any,
  undefined as any,
  (compose as any)(...enhancers),
);
const persistor = persistStore(store as any, undefined as any, () => {});
const configureStore = () => {
  return { persistor, store };
};

sagaMiddleware.run(sagas);

export default configureStore;
