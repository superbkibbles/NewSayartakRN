import { put, call, select } from 'redux-saga/effects';
import type { SagaIterator } from 'redux-saga';
import { API } from '../api';
import * as Actions from '../actions/Actions';
import NavigationService, { _navigator } from '../navigation/NavigationService';
import { logErrors } from '../api/ApisFunctions';
import { getAppInfo } from '../utils/functions';
import type { ApiResponse } from 'apisauce';

// Global declarations used across the app
declare const global: any;

type RequestMethod = 'POST' | 'GET' | 'PUT' | 'DELETE';

type NavigationType = 'back' | 'navigate' | 'replace';

export interface GeneralSagaPayload {
  actionType: string;
  requestMethod: RequestMethod;
  serviceUrl: string;
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

export interface RequestAction {
  type: string;
  payload: GeneralSagaPayload;
}

type ApiCallMethod = (
  url: string,
  data?: unknown,
) => Promise<ApiResponse<unknown>>;

export default function* generalSaga(action: RequestAction): SagaIterator {
  const currentState: any = yield select();
  // let fff = yield checkInternetConnection()

  if (action.payload.formData) {
    API.setHeader('Content-Type', 'multipart/form-data');
    // API.setHeader("Accept", "multipart/form-data")
  } else {
    API.setHeader('Accept', 'application/json');
    API.setHeader('Content-Type', 'application/json');
  }

  let token =
    currentState.presistReducer.token ||
    currentState.generalReducer.verify_phone_token;
  if (action.payload.setHeader) {
    if (token) API.setHeader('Authorization', 'token ' + token);
  }
  yield put(Actions.enableLoader(action.payload.actionType));

  const callMethod: ApiCallMethod =
    action.payload.requestMethod === 'POST'
      ? (API.post as ApiCallMethod)
      : action.payload.requestMethod === 'GET'
      ? (API.get as ApiCallMethod)
      : action.payload.requestMethod === 'PUT'
      ? (API.put as ApiCallMethod)
      : (API.delete as ApiCallMethod);

  const response: ApiResponse<any> = yield call(
    callMethod,
    action.payload.serviceUrl +
      (action.payload.urlParams ? action.payload.urlParams : ''),
    action.payload.body ? action.payload.body : {},
  );

  console.log(
    '%c' + action.payload.actionType + ' Response : ',
    'background:green;color:white',
    '',
    response,
  );

  if (action.payload.setHeader) {
    API.deleteHeader('Authorization');
  }

  yield put(Actions.disableLoader(action.payload.actionType));

  try {
    //Will edit this section according to the api response

    if (response.ok) {
      if (action.payload.presist) {
        yield put(Actions.saveResponsePresist(action.payload, response.data));
      } else {
        yield put(Actions.saveResponseGeneral(action.payload, response.data));
      }

      if (action.payload.nextAction) {
        try {
          action.payload.nextAction(response.data);
        } catch {
          try {
            action.payload.nextAction(response.data);
          } catch (e) {
            global.openToast('Network Error', 'e');
          }
        }
      }

      if (action.payload.navigationType === 'back') {
        (NavigationService.goBack as any)(undefined);
      } else if (action.payload.navigateTo) {
        action.payload.navigationType === 'navigate'
          ? (NavigationService.navigate as any)(
              action.payload.navigateTo as any,
              action.payload.extraData as any,
            )
          : NavigationService.replace(
              action.payload.navigateTo,
              action.payload.extraData as any,
            );
      }
    } else {
      if (response.status === 401) {
        yield put(Actions.logout());
        if (action.payload.nextAction) action.payload.nextAction('logout_user');

        return;
      }

      if (response.problem === 'NETWORK_ERROR') {
        const currentRouteName: string | undefined = (():
          | string
          | undefined => {
          try {
            const nav: any = _navigator as any;
            return nav?.getCurrentRoute?.()?.name as string | undefined;
          } catch {
            return undefined;
          }
        })();
        if (currentRouteName !== 'NetworkError')
          (NavigationService.navigate as any)('NetworkError', undefined);
      }

      if (action.payload.failAction) {
        try {
          action.payload.failAction();
        } catch (e) {
          try {
            action.payload.failAction();
          } catch {
            // global.openToast("Network Errorsss", "e")
          }
        }
      } else {
        if (response.data) {
          const data: any = response.data as any;
          if (data.error === 'UnAuthorised')
            global.openToast('خطأ في البريد الالكتروني او كلمة المرور', 'e');
          else if (typeof data.error === 'string')
            global.openToast(JSON.stringify(data.error), 'e');
          else if (typeof data.error === 'object')
            global.openToast(
              JSON.stringify(
                (data.error as Record<string, any>)[Object.keys(data.error)[0]],
              ),
              'e',
            );
          else
            global.openToast(
              JSON.stringify(
                (data as Record<string, any>)[
                  Object.keys(data as Record<string, any>)[0]
                ],
              ),
              'e',
            );
        }
      }
    }
  } catch (e) {
    const appInfo: any = yield call(getAppInfo as any);
    let data = handelReportError(
      e,
      action.payload.actionType,
      action.payload.serviceUrl,
      action.payload.body,
      appInfo,
    );
    yield put(Actions.requestAction(logErrors(data)));

    console.log('yieldyieldyieldyieldyield', data);
    global.openToast('Network Error', 'e');
  }
}

const handelReportError = (
  e: unknown,
  actionType: string,
  url: string,
  body: unknown,
  appInfo: any,
) => {
  let errorData = {
    platform: appInfo.platform,
    error_msg: String(e),
    error_trace:
      'error in \n\naction type :' +
      actionType +
      ' \n\nendpoit :' +
      url +
      ' \n\nbody : ' +
      JSON.stringify(body),
    device_name: appInfo.deviceName,
    error_type: 'CALL_APIS',
    version: appInfo.version,
  };
  return errorData;
};

// Removed unused checkInternetConnection to satisfy linter
