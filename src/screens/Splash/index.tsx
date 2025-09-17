import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../actions/Actions';
import {
  appSettings,
  getBrandModals,
  getBrands,
  getCities,
  getNotViewdNotificationCount,
} from '../../api/ApisFunctions';
import NavigationService from '../../navigation/NavigationService';
import SplashView from './SplashView';
// import messaging from '@react-native-firebase/messaging'
import { getAppInfo } from '../../utils/functions';

function Splash(params: any) {
  // const requestUserPermission = async () => {
  //   const settings = await messaging().requestPermission();
  //   if (settings) {

  //   }
  // }
  // get app setting moved inside effect to avoid changing deps

  // get brand list
  useEffect(() => {
    // requestUserPermission()
    params.requestAction(getCities(undefined));
    params.requestAction(getBrands(undefined));
    if (params.carData.brand !== -1)
      params.requestAction(
        getBrandModals(params.brands[params.carData.brand].id, undefined),
      );
    if (params.token) params.requestAction(getNotViewdNotificationCount());
    (async () => {
      const appInfo = (await getAppInfo()) as any;
      params.appSettings(
        appSettings(
          '?platform=' + appInfo.platform + '&version=' + appInfo.version,
          (data: any) => {
            if (data === 'logout_user') {
              NavigationService.replace('Tabs', undefined);
              return;
            }
            setTimeout(() => {
              if (data.status === 'force_update')
                NavigationService.replace('ForceUpdateApp', undefined);
              else {
                if (
                  params.skipThisVersion < parseInt(data.current_version, 10) &&
                  data.status === 'warning_update'
                )
                  params.setWarningVersion(true, undefined);
                NavigationService.replace('Tabs', undefined);
              }
            }, 2000);
          },
        ),
      );
    })();
  }, [params]);
  return <SplashView {...params} />;
}
function mapStateToProps(state: any) {
  return {
    carData: state.presistReducer.carData,
    token: state.presistReducer.token,
    brands: state.presistReducer.brands,
    skipThisVersion: state.presistReducer.skipThisVersion,
  };
}
function mapDispatchToProps(dispatch: any) {
  return {
    setWarningVersion: (isShow: any, version?: any) =>
      dispatch(Actions.setWarningVersion(isShow, version)),
    appSettings: (paylaod: any) => dispatch(Actions.requestAction(paylaod)),
    requestAction: (paylaod: any) => dispatch(Actions.requestAction(paylaod)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Splash);
