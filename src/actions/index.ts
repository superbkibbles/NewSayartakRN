// Export all slice actions
export {
  setWarningVersion,
  setAdvancedFilter as setAdvancedFilterPersist,
  storeCarData,
  soldCar as soldCarPersist,
  removeCarFromLists as removeCarPersist,
  logout,
  updateProfile as updateProfileAction,
  addNewCar as addNewCarAction,
  favouriteCar,
  favouriteShowroom,
  resetCarData,
  resetCars,
  resetShowrooms,
  verifyPhoneSuccess,
  signInSuccess,
  socialLoginSuccess,
  getCitiesSuccess,
  getBrandsSuccess,
  getAllCarsSuccess,
  getShowroomsSuccess,
  getFavouriteCarsSuccess,
  getFavouriteShowroomsSuccess,
  getMyCarsSuccess,
  getNotificationListSuccess,
  getNotViewedNotificationSuccess,
} from '../store/slices/persistSlice';

export {
  setAdvancedFilter as setAdvancedFilterGeneral,
  soldCar as soldCarGeneral,
  removeCarFromLists as removeCarGeneral,
  resetEditCarData,
  resetFilter,
  resetResultFilterCars,
  resetShowroomCars,
  forgotPasswordSendOtpSuccess,
  getShowroomCarsSuccess,
  getSimilarCarsSuccess,
  getBrandModalsSuccess,
  getAllFilterCarsSuccess,
} from '../store/slices/generalSlice';

export {
  enableLoader,
  disableLoader,
  setOpacityFooter,
} from '../store/slices/loadingSlice';

export { changeLayout, setAppSettings } from '../store/slices/appSettingsSlice';

// Export all async thunks
export * from '../store/thunks/apiThunks';

// Legacy action creators for backward compatibility
import {
  setWarningVersion as setWarningVersionAction,
  setAdvancedFilter as setAdvancedFilterPersistAction,
  resetCarData as resetCarDataAction,
  resetCars as resetCarsAction,
} from '../store/slices/persistSlice';

import {
  enableLoader as enableLoaderAction,
  disableLoader as disableLoaderAction,
} from '../store/slices/loadingSlice';

import { changeLayout as changeLayoutAction } from '../store/slices/appSettingsSlice';

import {
  setAdvancedFilter as setAdvancedFilterGeneralAction,
  resetFilter as resetFilterAction,
  resetResultFilterCars as resetResultFilterCarsAction,
} from '../store/slices/generalSlice';

export function setWarningVersionLegacy(isShow: any, version: any) {
  return setWarningVersionAction({ isShow, version });
}

export function setAdvancedFilterLegacy(data: any, filterKey: any) {
  if (filterKey === 'carData') {
    return setAdvancedFilterPersistAction({ data, filterKey });
  } else {
    return setAdvancedFilterGeneralAction({ data, filterKey });
  }
}

export function resetLegacy(data: any) {
  // This would need to be handled case by case based on what's being reset
  if (data === 'carData') {
    return resetCarDataAction();
  } else if (data === 'filter') {
    return resetFilterAction();
  } else if (data === 'resultFilterCars') {
    return resetResultFilterCarsAction();
  } else if (data === 'cars') {
    return resetCarsAction();
  }
  // Return a no-op action if no match
  return { type: 'RESET_LEGACY_FALLBACK', payload: data };
}

export function enableLoaderLegacy(actionType: any) {
  return enableLoaderAction(actionType);
}

export function disableLoaderLegacy(actionType: any) {
  return disableLoaderAction(actionType);
}

export function changeLayoutLegacy(layout: any, component_type: any) {
  return changeLayoutAction({ layout, component_type });
}
