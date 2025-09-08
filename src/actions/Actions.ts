/*
 * Reducer actions related with App
 */
import * as types from './types';

export function setWarningVersion(isShow: any, version: any) {
  return {
    type: types.SET_WARNING_VERSION,
    isShow,
    version,
  };
}
// store car data
export function setAdvancedFilter(data: any, filterKey: any) {
  return {
    type: types.SET_ADVANCED_FILTER,
    data,
    filterKey: filterKey,
  };
}
// store car data
export function logout() {
  return {
    type: types.LOGOUT_USER,
  };
}

export function reset(data: any) {
  return {
    type: types.RESET,
    data,
  };
}
// store car data
export function storeCarData(data: any) {
  return {
    type: types.STORE_ADD_CAR_DATA,
    data,
  };
}

export function requestAction(payload: any) {
  return {
    type: types.REQUEST_ACTION,
    payload,
  };
}
export function requestActionLatest(payload: any) {
  return {
    type: types.REQUEST_ACTION_LATEST,
    payload,
  };
}

export function saveResponseGeneral(
  payload: { actionType: any },
  response: any,
) {
  return {
    type: payload.actionType,
    payload,
    response,
  };
}

export function saveResponsePresist(
  payload: { actionType: any },
  response: any,
) {
  return {
    type: payload.actionType,
    payload,
    response,
  };
}

export function clearPresist() {
  return {
    type: types.CLEAR_PRESIST_REDUCER,
  };
}

//Loaders Actions

export function enableLoader(actionType: any) {
  return {
    type: types.ENABLE_LOADER,
    actionType,
  };
}

export function disableLoader(actionType: any) {
  return {
    type: types.DISABLE_LOADER,
    actionType,
  };
}
export function changeLayout(layout: any, component_type: any) {
  return {
    type: types.CHANGE_LAYOUT,
    layout: layout,
    component_type: component_type,
  };
}
