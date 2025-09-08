/**
 * Loading reducer made seperate for easy blacklisting
 * Avoid data persist
 */
import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

const initialState = {
  fullPageLoading: [],
  isOpacityFooter: false,
};

export const loadingReducer = createReducer(initialState, {
  [types.ENABLE_LOADER](state, action) {
    return {
      ...state,
      [action.actionType]: true,
      fullPageLoading: { ...state.fullPageLoading, [action.actionType]: true },
    };
  },
  [types.DISABLE_LOADER](state, action) {
    return {
      ...state,
      [action.actionType]: false,
      fullPageLoading: { ...state.fullPageLoading, [action.actionType]: false },
    };
  },
  [types.HOME_CHANGE_OPACITY_FOOTER](state, action) {
    return { ...state, isOpacityFooter: action.flag };
  },
});
