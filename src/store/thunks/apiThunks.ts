import { createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../api';
import ApiConstants from '../../api/ApiConstants';
import NavigationService, {
  _navigator,
} from '../../navigation/NavigationService';
// import { logErrors } from '../../api/ApisFunctions'; // Removed as it's not used in this implementation
import { getAppInfo } from '../../utils/functions';
import type { ApiResponse } from 'apisauce';
import { RootState } from '../';

// Global declarations used across the app
declare const global: any;

type RequestMethod = 'POST' | 'GET' | 'PUT' | 'DELETE';
type NavigationType = 'back' | 'navigate' | 'replace';

export interface ApiThunkPayload {
  actionType: string;
  requestMethod: RequestMethod;
  serviceUrl: string; // Can be either a full URL or a key from ApiConstants
  urlParams?: string;
  body?: unknown;
  formData?: boolean;
  setHeader?: boolean;
  presist?: boolean;
  nextAction?: (data: unknown) => void;
  failAction?: () => void;
  navigationType?: NavigationType;
  navigateTo?: string;
  extraData?: unknown;
}

// Helper function to resolve serviceUrl (like the old getUrl function)
function resolveServiceUrl(serviceUrl: string): string {
  // If it starts with '/', it's already a full path
  if (serviceUrl.startsWith('/')) {
    return serviceUrl;
  }
  // Otherwise, try to resolve it from ApiConstants
  const resolvedUrl = ApiConstants[serviceUrl as keyof typeof ApiConstants];
  if (resolvedUrl) {
    return resolvedUrl;
  }
  // Fallback to the original serviceUrl
  return serviceUrl;
}

// Generic API call thunk
export const makeApiCall = createAsyncThunk(
  'api/makeCall',
  async (payload: ApiThunkPayload, { getState, rejectWithValue }) => {
    console.log('makeApiCall called with payload:', payload);
    const currentState = getState() as RootState;

    try {
      // Set headers
      if (payload.formData) {
        API.setHeader('Content-Type', 'multipart/form-data');
      } else {
        API.setHeader('Accept', 'application/json');
        API.setHeader('Content-Type', 'application/json');
      }

      const token =
        currentState.persist.token || currentState.general.verify_phone_token;
      if (payload.setHeader && token) {
        API.setHeader('Authorization', 'token ' + token);
      }

      // Select API method
      const callMethod =
        payload.requestMethod === 'POST'
          ? API.post
          : payload.requestMethod === 'GET'
          ? API.get
          : payload.requestMethod === 'PUT'
          ? API.put
          : API.delete;

      // Resolve the service URL and make API call
      const resolvedUrl = resolveServiceUrl(payload.serviceUrl);
      const fullUrl =
        resolvedUrl + (payload.urlParams ? payload.urlParams : '');

      console.log('Making API call to:', fullUrl);

      const response: ApiResponse<any> = await callMethod(
        fullUrl,
        payload.body || {},
      );

      console.log(
        '%c' + payload.actionType + ' Response : ',
        'background:green;color:white',
        '',
        response,
      );

      // Clean up headers
      if (payload.setHeader) {
        API.deleteHeader('Authorization');
      }

      if (response.ok) {
        // Handle success
        if (payload.nextAction) {
          try {
            payload.nextAction(response.data);
          } catch (e) {
            console.error('NextAction error:', e);
            global.openToast('Network Error', 'e');
          }
        }

        // Handle navigation
        if (payload.navigationType === 'back') {
          (NavigationService.goBack as any)();
        } else if (payload.navigateTo) {
          if (payload.navigationType === 'navigate') {
            NavigationService.navigate(
              payload.navigateTo as any,
              payload.extraData as any,
            );
          } else {
            NavigationService.replace(
              payload.navigateTo,
              payload.extraData as any,
            );
          }
        }

        return {
          actionType: payload.actionType,
          data: response.data,
          presist: payload.presist,
        };
      } else {
        // Handle errors
        if (response.status === 401) {
          if (payload.nextAction) payload.nextAction('logout_user');
          return rejectWithValue({ type: 'LOGOUT', message: 'Unauthorized' });
        }

        if (response.problem === 'NETWORK_ERROR') {
          const currentRouteName = (() => {
            try {
              const nav: any = _navigator;
              return nav?.getCurrentRoute?.()?.name;
            } catch {
              return undefined;
            }
          })();

          if (currentRouteName !== 'NetworkError') {
            NavigationService.navigate('NetworkError' as any, undefined);
          }
        }

        if (payload.failAction) {
          try {
            payload.failAction();
          } catch (e) {
            console.error('FailAction error:', e);
          }
        } else {
          // Handle error messages
          if (response.data) {
            const data: any = response.data;
            if (data.error === 'UnAuthorised') {
              global.openToast('خطأ في البريد الالكتروني او كلمة المرور', 'e');
            } else if (typeof data.error === 'string') {
              global.openToast(JSON.stringify(data.error), 'e');
            } else if (typeof data.error === 'object') {
              global.openToast(
                JSON.stringify(data.error[Object.keys(data.error)[0]]),
                'e',
              );
            } else {
              global.openToast(JSON.stringify(data[Object.keys(data)[0]]), 'e');
            }
          }
        }

        return rejectWithValue({
          status: response.status,
          problem: response.problem,
          data: response.data,
        });
      }
    } catch (e) {
      // Handle exceptions
      const appInfo: any = await getAppInfo();
      const errorData = {
        platform: appInfo.platform,
        error_msg: String(e),
        error_trace: `error in \n\naction type: ${
          payload.actionType
        }\n\nendpoint: ${payload.serviceUrl}\n\nbody: ${JSON.stringify(
          payload.body,
        )}`,
        device_name: appInfo.deviceName,
        error_type: 'CALL_APIS',
        version: appInfo.version,
      };

      // Log error (you might want to dispatch this)
      console.log('API Error:', errorData);
      global.openToast('Network Error', 'e');

      return rejectWithValue({
        type: 'NETWORK_ERROR',
        message: String(e),
        errorData,
      });
    }
  },
);

// Specific API thunks
export const signIn = createAsyncThunk(
  'auth/signIn',
  async (params: { email: string; password: string }, { dispatch }) => {
    return dispatch(
      makeApiCall({
        actionType: 'SIGN_IN',
        requestMethod: 'POST',
        serviceUrl: '/auth/login/',
        body: params,
        setHeader: false,
        presist: true,
      }),
    );
  },
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (params: any, { dispatch }) => {
    return dispatch(
      makeApiCall({
        actionType: 'SIGN_UP',
        requestMethod: 'POST',
        serviceUrl: '/auth/register/',
        body: params,
        setHeader: false,
        presist: true,
      }),
    );
  },
);

export const verifyPhoneNumber = createAsyncThunk(
  'auth/verifyPhoneNumber',
  async (params: { phone: string; otp: string }, { dispatch }) => {
    return dispatch(
      makeApiCall({
        actionType: 'VERIFY_PHONE_NUMBER',
        requestMethod: 'POST',
        serviceUrl: '/auth/verify-phone/',
        body: params,
        setHeader: false,
        presist: true,
      }),
    );
  },
);

export const forgotPasswordSendOtp = createAsyncThunk(
  'auth/forgotPasswordSendOtp',
  async (params: { phone: string }, { dispatch }) => {
    return dispatch(
      makeApiCall({
        actionType: 'FORGOT_PASSWORD_SEND_OTP',
        requestMethod: 'POST',
        serviceUrl: '/auth/forgot-password/',
        body: params,
        setHeader: false,
        presist: false,
      }),
    );
  },
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (
    params: { phone: string; otp: string; password: string },
    { dispatch },
  ) => {
    return dispatch(
      makeApiCall({
        actionType: 'RESET_PASSWORD',
        requestMethod: 'POST',
        serviceUrl: '/auth/reset-password/',
        body: params,
        setHeader: false,
        presist: false,
      }),
    );
  },
);

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (
    params: { old_password: string; new_password: string },
    { dispatch },
  ) => {
    return dispatch(
      makeApiCall({
        actionType: 'CHANGE_PASSWORD',
        requestMethod: 'POST',
        serviceUrl: '/auth/change-password/',
        body: params,
        setHeader: true,
        presist: false,
      }),
    );
  },
);

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (params: any, { dispatch }) => {
    return dispatch(
      makeApiCall({
        actionType: 'UPDATE_PROFILE',
        requestMethod: 'PUT',
        serviceUrl: '/user/profile/',
        body: params,
        setHeader: true,
        presist: true,
      }),
    );
  },
);

export const getProfile = createAsyncThunk(
  'user/getProfile',
  async (_, { dispatch }) => {
    return dispatch(
      makeApiCall({
        actionType: 'GET_PROFILE',
        requestMethod: 'GET',
        serviceUrl: '/user/profile/',
        setHeader: true,
        presist: true,
      }),
    );
  },
);

export const getAllCars = createAsyncThunk(
  'cars/getAllCars',
  async (params: { page?: number; filters?: any } = {}, { dispatch }) => {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          queryParams.append(key, String(value));
        }
      });
    }

    return dispatch(
      makeApiCall({
        actionType: 'GET_ALL_CARS',
        requestMethod: 'GET',
        serviceUrl: `/cars/?${queryParams.toString()}`,
        setHeader: false,
        presist: true,
      }),
    );
  },
);

export const getBrands = createAsyncThunk(
  'cars/getBrands',
  async (_, { dispatch }) => {
    return dispatch(
      makeApiCall({
        actionType: 'GET_BRANDS',
        requestMethod: 'GET',
        serviceUrl: 'GET_BRANDS',
        setHeader: false,
        presist: true,
      }),
    );
  },
);

export const getCities = createAsyncThunk(
  'general/getCities',
  async (_, { dispatch }) => {
    return dispatch(
      makeApiCall({
        actionType: 'GET_CITIES',
        requestMethod: 'GET',
        serviceUrl: 'GET_CITIES',
        setHeader: false,
        presist: true,
      }),
    );
  },
);

export const getShowrooms = createAsyncThunk(
  'showrooms/getShowrooms',
  async (params: { page?: number } = {}, { dispatch }) => {
    const queryParams = params.page ? `?page=${params.page}` : '';
    return dispatch(
      makeApiCall({
        actionType: 'GET_SHOW_ROOMS',
        requestMethod: 'GET',
        serviceUrl: `/showrooms/${queryParams}`,
        setHeader: false,
        presist: true,
      }),
    );
  },
);

export const getShowroomCars = createAsyncThunk(
  'showrooms/getShowroomCars',
  async (params: { showroomId: string; page?: number }, { dispatch }) => {
    const queryParams = params.page ? `?page=${params.page}` : '';
    return dispatch(
      makeApiCall({
        actionType: 'GET_SHOW_ROOM_CARS',
        requestMethod: 'GET',
        serviceUrl: `/showrooms/${params.showroomId}/cars/${queryParams}`,
        setHeader: false,
        presist: false,
      }),
    );
  },
);

export const getSimilarCars = createAsyncThunk(
  'cars/getSimilarCars',
  async (params: { carId: string }, { dispatch }) => {
    return dispatch(
      makeApiCall({
        actionType: 'SIMILAR_CARS',
        requestMethod: 'GET',
        serviceUrl: `/cars/${params.carId}/similar/`,
        setHeader: false,
        presist: false,
      }),
    );
  },
);

export const getBrandModals = createAsyncThunk(
  'cars/getBrandModals',
  async (params: { brandId: string }, { dispatch }) => {
    return dispatch(
      makeApiCall({
        actionType: 'GET_BRAND_MODALS',
        requestMethod: 'GET',
        serviceUrl: `/cars/brands/${params.brandId}/models/`,
        setHeader: false,
        presist: false,
      }),
    );
  },
);

export const getAllFilterCars = createAsyncThunk(
  'cars/getAllFilterCars',
  async (params: { filters: any; page?: number }, { dispatch }) => {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    Object.entries(params.filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        queryParams.append(key, String(value));
      }
    });

    return dispatch(
      makeApiCall({
        actionType: 'GET_ALL_FILTER_CARS',
        requestMethod: 'GET',
        serviceUrl: `/cars/filter/?${queryParams.toString()}`,
        setHeader: false,
        presist: false,
      }),
    );
  },
);

export const favouriteCar = createAsyncThunk(
  'cars/favouriteCar',
  async (params: { carId: string }, { dispatch }) => {
    return dispatch(
      makeApiCall({
        actionType: 'FAVOURITE_CARS',
        requestMethod: 'POST',
        serviceUrl: `/cars/${params.carId}/favourite/`,
        setHeader: true,
        presist: true,
      }),
    );
  },
);

export const favouriteShowroom = createAsyncThunk(
  'showrooms/favouriteShowroom',
  async (params: { showroomId: string }, { dispatch }) => {
    return dispatch(
      makeApiCall({
        actionType: 'FAVOURITE_SHOWROOM',
        requestMethod: 'POST',
        serviceUrl: `/showrooms/${params.showroomId}/favourite/`,
        setHeader: true,
        presist: true,
      }),
    );
  },
);

export const getFavouriteCars = createAsyncThunk(
  'user/getFavouriteCars',
  async (params: { page?: number } = {}, { dispatch }) => {
    const queryParams = params.page ? `?page=${params.page}` : '';
    return dispatch(
      makeApiCall({
        actionType: 'FAVOURITE_CARS_LIST',
        requestMethod: 'GET',
        serviceUrl: `/user/favourite-cars/${queryParams}`,
        setHeader: true,
        presist: true,
      }),
    );
  },
);

export const getFavouriteShowrooms = createAsyncThunk(
  'user/getFavouriteShowrooms',
  async (params: { page?: number } = {}, { dispatch }) => {
    const queryParams = params.page ? `?page=${params.page}` : '';
    return dispatch(
      makeApiCall({
        actionType: 'FAVOURITE_SHOWROOMS_LIST',
        requestMethod: 'GET',
        serviceUrl: `/user/favourite-showrooms/${queryParams}`,
        setHeader: true,
        presist: true,
      }),
    );
  },
);

export const getMyCars = createAsyncThunk(
  'user/getMyCars',
  async (params: { page?: number } = {}, { dispatch }) => {
    const queryParams = params.page ? `?page=${params.page}` : '';
    return dispatch(
      makeApiCall({
        actionType: 'MY_CAR_ADS',
        requestMethod: 'GET',
        serviceUrl: `/user/my-cars/${queryParams}`,
        setHeader: true,
        presist: true,
      }),
    );
  },
);

export const getNotificationList = createAsyncThunk(
  'user/getNotificationList',
  async (params: { page?: number } = {}, { dispatch }) => {
    const queryParams = params.page ? `?page=${params.page}` : '';
    return dispatch(
      makeApiCall({
        actionType: 'GET_NOTIFICATION_LIST',
        requestMethod: 'GET',
        serviceUrl: `/user/notifications/${queryParams}`,
        setHeader: true,
        presist: true,
      }),
    );
  },
);

export const getNotViewedNotification = createAsyncThunk(
  'user/getNotViewedNotification',
  async (_, { dispatch }) => {
    return dispatch(
      makeApiCall({
        actionType: 'GET_NOT_VIEWD_NOTIFICATION',
        requestMethod: 'GET',
        serviceUrl: '/user/notifications/unread-count/',
        setHeader: true,
        presist: true,
      }),
    );
  },
);

export const addNewCar = createAsyncThunk(
  'cars/addNewCar',
  async (params: any, { dispatch }) => {
    return dispatch(
      makeApiCall({
        actionType: 'ADD_NEW_CAR',
        requestMethod: 'POST',
        serviceUrl: '/cars/',
        body: params,
        formData: true,
        setHeader: true,
        presist: true,
      }),
    );
  },
);

export const editCar = createAsyncThunk(
  'cars/editCar',
  async (params: { carId: string; data: any }, { dispatch }) => {
    return dispatch(
      makeApiCall({
        actionType: 'EDIT_CAR',
        requestMethod: 'PUT',
        serviceUrl: `/cars/${params.carId}/`,
        body: params.data,
        formData: true,
        setHeader: true,
        presist: false,
      }),
    );
  },
);

export const removeCar = createAsyncThunk(
  'cars/removeCar',
  async (params: { carId: string }, { dispatch }) => {
    return dispatch(
      makeApiCall({
        actionType: 'REMOVE_CAR',
        requestMethod: 'DELETE',
        serviceUrl: `/cars/${params.carId}/`,
        urlParams: `${params.carId}/`,
        setHeader: true,
        presist: false,
      }),
    );
  },
);

export const soldCar = createAsyncThunk(
  'cars/soldCar',
  async (params: { carId: string }, { dispatch }) => {
    return dispatch(
      makeApiCall({
        actionType: 'SOLD_CAR',
        requestMethod: 'POST',
        serviceUrl: `/cars/${params.carId}/sold/`,
        urlParams: `${params.carId}/`,
        setHeader: true,
        presist: false,
      }),
    );
  },
);

export const getAppSettings = createAsyncThunk(
  'app/getAppSettings',
  async (
    params: { platform?: string; version?: string } = {},
    { dispatch },
  ) => {
    const queryParams = new URLSearchParams();
    if (params.platform) queryParams.append('platform', params.platform);
    if (params.version) queryParams.append('version', params.version);

    return dispatch(
      makeApiCall({
        actionType: 'APP_SETTINGS',
        requestMethod: 'GET',
        serviceUrl: 'APP_SETTINGS',
        urlParams: `?${queryParams.toString()}`,
        setHeader: true, // Changed to true to match old implementation
        presist: false,
      }),
    );
  },
);

export const contactUs = createAsyncThunk(
  'general/contactUs',
  async (
    params: { name: string; email: string; message: string },
    { dispatch },
  ) => {
    return dispatch(
      makeApiCall({
        actionType: 'CONTACT_US',
        requestMethod: 'POST',
        serviceUrl: '/general/contact-us/',
        body: params,
        setHeader: false,
        presist: false,
      }),
    );
  },
);

export const socialLogin = createAsyncThunk(
  'auth/socialLogin',
  async (params: { provider: string; access_token: string }, { dispatch }) => {
    return dispatch(
      makeApiCall({
        actionType: 'SOCAIL_LOGIN',
        requestMethod: 'POST',
        serviceUrl: '/auth/social-login/',
        body: params,
        setHeader: false,
        presist: true,
      }),
    );
  },
);

export const carViews = createAsyncThunk(
  'cars/carViews',
  async (params: { carId: string }, { dispatch }) => {
    return dispatch(
      makeApiCall({
        actionType: 'CAR_VIEWS',
        requestMethod: 'POST',
        serviceUrl: `/cars/${params.carId}/view/`,
        setHeader: false,
        presist: false,
      }),
    );
  },
);

export const resendOtp = createAsyncThunk(
  'auth/resendOtp',
  async (params: { phone: string }, { dispatch }) => {
    return dispatch(
      makeApiCall({
        actionType: 'RESEND_OTP',
        requestMethod: 'POST',
        serviceUrl: '/auth/resend-otp/',
        body: params,
        setHeader: false,
        presist: false,
      }),
    );
  },
);
