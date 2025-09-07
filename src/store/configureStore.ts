import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-community/async-storage';

import rootReducers from 'app/reducers'; // where reducers is a object of reducers
import sagas from 'app/sagas';

const config = {
    key: 'root',
    storage:AsyncStorage,
    whitelist: ['presistReducer','userReducer',"homeReducer","appSettingsReducer"],
    // blacklist: ['nav', 'loadingReducer'],
    debug: true //to get useful logging
};

const middleware = [];
const sagaMiddleware = createSagaMiddleware();

middleware.push(sagaMiddleware);

if (__DEV__) {
    middleware.push(createLogger());
}

const reducers = persistCombineReducers(config, rootReducers);
const enhancers = [applyMiddleware(...middleware)];
// const initialState = {};
const persistConfig = { enhancers };
const store = createStore(reducers, undefined, compose(...enhancers));
const persistor = persistStore(store, persistConfig, () => {
});
const configureStore = () => {
    return { persistor, store };
};

sagaMiddleware.run(sagas);

export default configureStore;
