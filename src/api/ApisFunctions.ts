import payload from './payload';

export function addDeviceNotification(data, nextAction) {
  return payload({
    serviceUrl: 'ADD_DEVICE_NOTIFICATION',
    actionType: 'ADD_DEVICE_NOTIFICATION',
    requestMethod: 'POST',
    setHeader: true,
    body: data,
    nextAction: nextAction,
  });
}

export function sold_car(id, nextAction) {
  return payload({
    serviceUrl: 'SOLD_CAR',
    actionType: 'SOLD_CAR',
    requestMethod: 'GET',
    setHeader: true,
    urlParams: `${id}/sold/`,
    nextAction: nextAction,
  });
}

export function logErrors(data) {
  return payload({
    serviceUrl: 'LOG_ERRORS',
    actionType: 'LOG_ERRORS',
    requestMethod: 'POST',
    setHeader: true,
    body: data,
  });
}
export function removeCar(url, nextAction) {
  return payload({
    serviceUrl: 'REMOVE_CAR',
    actionType: 'REMOVE_CAR',
    requestMethod: 'DELETE',
    setHeader: true,
    nextAction: nextAction,
    urlParams: url + '/',
  });
}
export function appSettings(url, nextAction) {
  return payload({
    serviceUrl: 'APP_SETTINGS',
    actionType: 'APP_SETTINGS',
    requestMethod: 'GET',
    setHeader: true,
    nextAction: nextAction,
    urlParams: url,
  });
}

export function editCar(data, car_id, nextAction) {
  return payload({
    serviceUrl: 'EDIT_CAR',
    actionType: 'EDIT_CAR',
    requestMethod: 'PUT',
    setHeader: true,
    nextAction: nextAction,
    body: data,
    formData: true,
    urlParams: car_id + '/',
  });
}

export function addNewCar(data, nextAction) {
  return payload({
    serviceUrl: 'ADD_NEW_CAR',
    actionType: 'ADD_NEW_CAR',
    requestMethod: 'POST',
    setHeader: true,
    nextAction: nextAction,
    body: data,
    formData: true,
  });
}

export function getNotificationList(url, reset) {
  return payload({
    serviceUrl: 'GET_NOTIFICATION_LIST',
    actionType: 'GET_NOTIFICATION_LIST',
    requestMethod: 'GET',
    setHeader: true,
    reset: reset ? 'notification_list' : undefined,
    urlParams: url,
  });
}
export function getNotViewdNotificationCount() {
  return payload({
    serviceUrl: 'GET_NOT_VIEWD_NOTIFICATION',
    actionType: 'GET_NOT_VIEWD_NOTIFICATION',
    requestMethod: 'GET',
    setHeader: true,
  });
}

export function myCarAds(url, reset) {
  return payload({
    serviceUrl: 'MY_CAR_ADS',
    actionType: 'MY_CAR_ADS',
    requestMethod: 'GET',
    setHeader: true,
    urlParams: url,
    reset: reset ? 'myCarsList' : undefined,
  });
}

export function getFavouriteShowRoomsList(url) {
  return payload({
    serviceUrl: 'FAVOURITE_SHOWROOMS_LIST',
    actionType: 'FAVOURITE_SHOWROOMS_LIST',
    requestMethod: 'GET',
    setHeader: true,
    urlParams: url,
  });
}

export function getFavouriteCarsList(url, reset) {
  return payload({
    serviceUrl: 'FAVOURITE_CARS_LIST',
    actionType: 'FAVOURITE_CARS_LIST',
    requestMethod: 'GET',
    setHeader: true,
    urlParams: url,
    reset: reset ? 'dd' : undefined,
  });
}

export function similarCars(id) {
  return payload({
    serviceUrl: 'SIMILAR_CARS',
    actionType: 'SIMILAR_CARS',
    requestMethod: 'GET',
    urlParams: `${id}/`,
    reset: 'similr_cars',
  });
}

export function updateProfile(body, nextAction) {
  return payload({
    serviceUrl: 'UPDATE_PROFILE',
    actionType: 'UPDATE_PROFILE',
    requestMethod: 'PUT',
    setHeader: true,
    body: body,
    nextAction: nextAction,
    formData: true,
  });
}

export function favouriteCars(id, nextAction) {
  return payload({
    serviceUrl: 'FAVOURITE_CARS',
    actionType: 'FAVOURITE_CARS',
    requestMethod: 'GET',
    setHeader: true,
    urlParams: `${id}/`,
    nextAction: nextAction,
  });
}

export function favouriteShowroom(id) {
  return payload({
    serviceUrl: 'FAVOURITE_SHOWROOM',
    actionType: 'FAVOURITE_SHOWROOM',
    requestMethod: 'GET',
    setHeader: true,
    urlParams: `${id}/`,
  });
}

export function getProfile() {
  return payload({
    serviceUrl: 'GET_PROFILE',
    actionType: 'GET_PROFILE',
    requestMethod: 'GET',
    setHeader: true,
  });
}

export function contactUs(body, nextAction) {
  return payload({
    serviceUrl: 'CONTACT_US',
    actionType: 'CONTACT_US',
    requestMethod: 'POST',
    body: body,
    nextAction: nextAction,
  });
}

export function forgotPassword(body, nextAction) {
  return payload({
    serviceUrl: 'FORGOT_PASSWORD',
    actionType: 'FORGOT_PASSWORD',
    requestMethod: 'POST',
    body: body,
    nextAction: nextAction,
  });
}
export function forgotPasswordSendOtp(body, nextAction) {
  return payload({
    serviceUrl: 'FORGOT_PASSWORD_SEND_OTP',
    actionType: 'FORGOT_PASSWORD_SEND_OTP',
    requestMethod: 'POST',
    body: body,
    nextAction: nextAction,
    setHeader: true,
  });
}
export function resetPassword(body, nextAction) {
  return payload({
    serviceUrl: 'RESET_PASSWORD',
    actionType: 'RESET_PASSWORD',
    requestMethod: 'POST',
    body: body,
    nextAction: nextAction,
    setHeader: true,
  });
}

export function changePassword(body, nextAction) {
  return payload({
    serviceUrl: 'CHANGE_PASSWORD',
    actionType: 'CHANGE_PASSWORD',
    requestMethod: 'POST',
    body: body,
    nextAction: nextAction,
    setHeader: true,
  });
}

export function verifyPhoneNumber(body, nextAction) {
  return payload({
    serviceUrl: 'VERIFY_PHONE_NUMBER',
    actionType: 'VERIFY_PHONE_NUMBER',
    requestMethod: 'POST',
    body: body,
    nextAction: nextAction,
  });
}
export function resendOtp(body, nextAction) {
  return payload({
    serviceUrl: 'RESEND_OTP',
    actionType: 'RESEND_OTP',
    requestMethod: 'POST',
    body: body,
    nextAction: nextAction,
  });
}

export function getBrandModals(id, nextAction) {
  return payload({
    serviceUrl: 'GET_BRAND_MODALS',
    actionType: 'GET_BRAND_MODALS',
    requestMethod: 'GET',
    urlParams: `?brand=${id}`,
    nextAction: nextAction,
  });
}

export function getBrands(id) {
  return payload({
    serviceUrl: 'GET_BRANDS',
    actionType: 'GET_BRANDS',
    requestMethod: 'GET',
  });
}

export function carViews(url) {
  return payload({
    serviceUrl: 'CAR_VIEWS',
    actionType: 'CAR_VIEWS',
    requestMethod: 'GET',
    urlParams: url,
  });
}

export function logout(data, nextAction) {
  return payload({
    serviceUrl: 'LOGOUT',
    actionType: 'LOGOUT',
    requestMethod: 'POST',
    setHeader: true,
    nextAction: nextAction,
    body: data,
  });
}

export function socailLogin(body, nextAction) {
  return payload({
    serviceUrl: 'SOCAIL_LOGIN',
    actionType: 'SOCAIL_LOGIN',
    requestMethod: 'POST',
    body: body,
    nextAction: nextAction,
  });
}

export function signIn(body, nextAction) {
  return payload({
    serviceUrl: 'SIGN_IN',
    actionType: 'SIGN_IN',
    requestMethod: 'POST',
    body: body,
    nextAction: nextAction,
  });
}

export function signUp(body, nextAction) {
  return payload({
    serviceUrl: 'SIGN_UP',
    actionType: 'SIGN_UP',
    requestMethod: 'POST',
    body: body,
    nextAction: nextAction,
  });
}

export function getCities(id) {
  return payload({
    serviceUrl: 'GET_CITIES',
    actionType: 'GET_CITIES',
    requestMethod: 'GET',
  });
}

export function filterCars(params, reset) {
  return payload({
    serviceUrl: 'GET_ALL_CARS',
    actionType: 'GET_ALL_FILTER_CARS',
    requestMethod: 'GET',
    urlParams: params,
    reset: reset ? 'resultFilterCars' : undefined,
    setHeader: true,
  });
}
export function getAllCars(url, reset) {
  return payload({
    serviceUrl: 'GET_ALL_CARS',
    actionType: 'GET_ALL_CARS',
    requestMethod: 'GET',
    reset: reset ? 'cars' : null,
    urlParams: url,
    setHeader: true,
  });
}

export function getShowRooms(url, reset) {
  return payload({
    serviceUrl: 'GET_SHOW_ROOMS',
    actionType: 'GET_SHOW_ROOMS',
    requestMethod: 'GET',
    setHeader: true,
    reset: reset ? 'showrooms' : undefined,
    urlParams: url,
  });
}
export function getShowRoomCars(id, reset) {
  return payload({
    serviceUrl: 'GET_SHOW_ROOM_CARS',
    actionType: 'GET_SHOW_ROOM_CARS',
    requestMethod: 'GET',
    urlParams: `?user=${id}`,
    reset: reset ? 'showroom_cars' : undefined,
  });
}
