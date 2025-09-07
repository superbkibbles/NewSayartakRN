import { put, call, select } from 'redux-saga/effects';
import { API } from "../api"
import * as Actions from '../actions/Actions';
import NavigationService, { _navigator } from '../navigation/NavigationService';
import { logErrors } from '../api/ApisFunctions';
import { getAppInfo } from '../utils/functions';
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";



export default function* generalSaga(action) {


  let currentState = yield select()
  // let fff = yield checkInternetConnection()


  if (action.payload.formData) {
    API.setHeader("Content-Type", "multipart/form-data")
    // API.setHeader("Accept", "multipart/form-data")
  }
  else {
    API.setHeader("Accept", "application/json")
    API.setHeader("Content-Type", "application/json")
  }

  let token = currentState.presistReducer.token || currentState.generalReducer.verify_phone_token
  if (action.payload.setHeader) {
    if (token)
      API.setHeader("Authorization", "token " + token)
  }
  yield put(Actions.enableLoader(action.payload.actionType));

  let callMethod =
    action.payload.requestMethod == "POST" ? API.post :
      action.payload.requestMethod == "GET" ? API.get :
        action.payload.requestMethod == "PUT" ? API.put :
          action.payload.requestMethod == "DELETE" ? API.delete : null

  const response = yield call(
    callMethod,
    action.payload.serviceUrl + (action.payload.urlParams ? (action.payload.urlParams) : ""),
    action.payload.body ? action.payload.body : {});

  console.log("%c" + action.payload.actionType + " Response : ", "background:green;color:white", "", response)

  if (action.payload.setHeader) {
    API.deleteHeader("Authorization")
  }

  yield put(Actions.disableLoader(action.payload.actionType));

  try {
    //Will edit this section according to the api response

    if (response.ok) {
      if (action.payload.presist) {
        yield put(Actions.saveResponsePresist(action.payload, response.data))
      }
      else {
        yield put(Actions.saveResponseGeneral(action.payload, response.data))
      }

      if (action.payload.nextAction) {
        try {
          action.payload.nextAction(response.data)
        }
        catch {
          try {
            action.payload.nextAction(response.data)
          }
          catch (e) {
            global.openToast("Network Error", "e")

          }

        }
      }

      if (action.payload.navigationType == "back") {
        NavigationService.goBack()
      }

      else if (action.payload.navigateTo) {
        action.payload.navigationType == "navigate" ?

          NavigationService.navigate(action.payload.navigateTo, action.payload.extraData)
          :
          NavigationService.replace(action.payload.navigateTo, action.payload.extraData)
      }

    }
    else {

    if (response.status===401)  {
      yield put(Actions.logout())
      if (action.payload.nextAction)
      action.payload.nextAction("logout_user")
      
     return
    }
    

    if (response.problem === "NETWORK_ERROR") {
        if (_navigator.getCurrentRoute().name !== "NetworkError")
          NavigationService.navigate("NetworkError")
      }

      if (action.payload.failAction) {
        try {
          action.payload.failAction()
        }
        catch (e) {
          try {
            action.payload.failAction()
          }
          catch {
            // global.openToast("Network Errorsss", "e")
          }

        }


      }
      else {
        if (response.data) {
          if (response.data.error === "UnAuthorised")
            global.openToast("خطأ في البريد الالكتروني او كلمة المرور", "e")
          else if (typeof response.data.error == "string")
            global.openToast(JSON.stringify(response.data.error), "e")
          else if (typeof response.data.error == "object")
            global.openToast(JSON.stringify(response.data.error[Object.keys(response.data.error)[0]]), "e")
          else
            global.openToast(JSON.stringify(response.data[Object.keys(response.data)[0]]), "e")

        }
      }
    }

  }
  catch (e) {
    let appInfo = yield getAppInfo()
    let data = handelReportError(e, action.payload.actionType, action.payload.serviceUrl, action.payload.body, appInfo)
    yield put(Actions.requestAction(logErrors(data)));

    console.log("yieldyieldyieldyieldyield",data)
    global.openToast("Network Error", "e")
  }
}



const handelReportError = (e, actionType, url, body, appInfo) => {
  let errorData = {
    "platform": appInfo.platform,
    "error_msg": e.toString(),
    "error_trace": "error in \n\naction type :" + actionType + " \n\nendpoit :" + url + " \n\nbody : " + JSON.stringify(body),
    "device_name": appInfo.deviceName,
    "error_type": "CALL_APIS",
    "version": appInfo.version
  }
  return errorData
}



let checkInternetConnection = async (isTry, productsCount) => {
  let networkState = await NetInfo.fetch()
  if (!networkState.isConnected) {
    console.log("Dfdfdfd", networkState)

  } else {
    console.log("Dfdfdfd", networkState)
  }
}