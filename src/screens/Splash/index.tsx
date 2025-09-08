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

function Splash(params) {
  // const requestUserPermission = async () => {
  //   const settings = await messaging().requestPermission();
  //   if (settings) {

  //   }
  // }
  const getAppSettings = async () => {
    // get app setting

    let appInfo = await getAppInfo();
    params.appSettings(
      appSettings(
        '?platform=' + appInfo.platform + '&version=' + appInfo.version,
        data => {
          if (data === 'logout_user') {
            NavigationService.replace('Tabs');
            return;
          }
          setTimeout(() => {
            if (data.status === 'force_update')
              NavigationService.replace('ForceUpdateApp');
            else {
              if (
                params.skipThisVersion < parseInt(data.current_version) &&
                data.status === 'warning_update'
              )
                params.setWarningVersion(true);
              NavigationService.replace('Tabs');
            }
          }, 2000);
        },
      ),
    );
  };

  // get brand list
  useEffect(() => {
    // requestUserPermission()
    params.requestAction(getCities());
    params.requestAction(getBrands());
    if (params.carData.brand !== -1)
      params.requestAction(
        getBrandModals(params.brands[params.carData.brand].id),
      );
    if (params.token) params.requestAction(getNotViewdNotificationCount());
    getAppSettings();
  }, []);
  return <SplashView {...params} />;
}
function mapStateToProps(state) {
  return {
    carData: state.presistReducer.carData,
    token: state.presistReducer.token,
    brands: state.presistReducer.brands,
    skipThisVersion: state.presistReducer.skipThisVersion,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setWarningVersion: paylaod => dispatch(Actions.setWarningVersion(paylaod)),
    appSettings: paylaod => dispatch(Actions.requestAction(paylaod)),
    requestAction: paylaod => dispatch(Actions.requestAction(paylaod)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Splash);
