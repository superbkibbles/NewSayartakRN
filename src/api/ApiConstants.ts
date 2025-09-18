/* App config for apis
 */

export type URLs =
  | 'BASE_URL'
  | 'GET_BRANDS'
  | 'GET_ALL_CARS'
  | 'GET_SHOW_ROOMS'
  | 'GET_SHOW_ROOM_CARS'
  | 'GET_BRAND_MODALS'
  | 'GET_CITIES'
  | 'CAR_VIEWS'
  | 'SIGN_IN'
  | 'SIGN_UP'
  | 'LOGOUT'
  | 'FORGOT_PASSWORD'
  | 'FORGOT_PASSWORD_SEND_OTP'
  | 'RESET_PASSWORD'
  | 'CHANGE_PASSWORD'
  | 'VERIFY_PHONE_NUMBER'
  | 'RESEND_OTP'
  | 'CONTACT_US'
  | 'FAVOURITE_SHOWROOM'
  | 'FAVOURITE_CARS'
  | 'GET_PROFILE'
  | 'UPDATE_PROFILE'
  | 'SIMILAR_CARS'
  | 'FAVOURITE_SHOWROOMS_LIST'
  | 'FAVOURITE_CARS_LIST'
  | 'MY_CAR_ADS'
  | 'GET_NOTIFICATION_LIST'
  | 'GET_NOT_VIEWD_NOTIFICATION'
  | 'ADD_NEW_CAR'
  | 'REMOVE_CAR'
  | 'EDIT_CAR'
  | 'SOCAIL_LOGIN'
  | 'APP_SETTINGS'
  | 'LOG_ERRORS'
  | 'SOLD_CAR'
  | 'ADD_DEVICE_NOTIFICATION';

const ApiConstants = {
  ADD_DEVICE_NOTIFICATION: '/accounts/device-notification/',
  SOLD_CAR: '/ads/car-ad/',
  LOG_ERRORS: '/logs/error-log/',
  REMOVE_CAR: '/ads/car/',
  EDIT_CAR: '/ads/car/',
  GET_NOT_VIEWD_NOTIFICATION: '/accounts/notifications/new_notifications/',
  GET_NOTIFICATION_LIST: '/accounts/notification-list/',
  FAVOURITE_SHOWROOMS_LIST: '/accounts/favourite-showroom-list/',
  FAVOURITE_CARS_LIST: '/ads/favourite-car-list/',
  MY_CAR_ADS: '/ads/my-cars/',
  SIMILAR_CARS: '/ads/similar-cars/',
  CONTACT_US: '/accounts/contact-us/',
  GET_PROFILE: '/accounts/user/profile/',
  UPDATE_PROFILE: '/accounts/user/update_profile/',
  FAVOURITE_SHOWROOM: '/accounts/favourite-showroom/',
  FAVOURITE_CARS: '/ads/favourite-car/',
  ADD_NEW_CAR: '/ads/add-car/',

  SOCAIL_LOGIN: '/accounts/user/socail_login/',
  IMAGE_URL: 'https://www.syartk.net/',
  BASE_URL: 'http://127.0.0.1:8000/api/',
  GET_BRANDS: '/ads/brand/',
  GET_ALL_CARS: '/ads/car/',
  GET_SHOW_ROOMS: '/accounts/showroom/',
  GET_SHOW_ROOM_CARS: '/ads/car',
  GET_BRAND_MODALS: '/ads/car-type',
  GET_CITIES: '/ads/city/',
  CAR_VIEWS: '/ads/car-ad/',
  SIGN_IN: '/accounts/user/login/',
  SIGN_UP: '/accounts/user/signup/',
  LOGOUT: '/accounts/user/logout/',

  FORGOT_PASSWORD: '/accounts/user/forget_password/',
  RESET_PASSWORD: '/accounts/user/set_password/',
  // RESEND_OTP: "/accounts/user/send_otp/",
  RESEND_OTP: '/accounts/user/forget_password/',

  FORGOT_PASSWORD_SEND_OTP: '/accounts/user/verify_otp/',
  CHANGE_PASSWORD: '/accounts/user/change_password/',
  VERIFY_PHONE_NUMBER: '/accounts/user/verify_otp/',
  APP_SETTINGS: '/settings/version/',
};

export default ApiConstants;
