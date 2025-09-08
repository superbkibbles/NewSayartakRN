/**
 *  Redux saga class init
 */
import { takeEvery, all, takeLatest } from 'redux-saga/effects';
import * as types from '../actions/types';
import generalSaga from './generalSaga';


export default function* watch() {
    yield all([
        takeEvery(types.REQUEST_ACTION, generalSaga),
        takeLatest(types.REQUEST_ACTION_LATEST, generalSaga)
        // takeLatest(types.GET_COUNTRIES_DATA, getCountries)
    ]);
}
