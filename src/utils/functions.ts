import { I18nManager, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { getAppVersion } from '../config/appConfig';

export const getAppInfo = async () => {
  return new Promise((resolve, reject) => {
    DeviceInfo.getDeviceName()
      .then(res => {
        resolve({
          deviceName: res,
          version: getAppVersion(),
          platform: Platform.OS,
        });
      })
      .catch(e => {
        reject(e);
      });
  });
};
export const getKey = (key: string) => {
  let isAr = I18nManager.isRTL;
  if (isAr) return key + '_ar';
  else return key + '_en';
};
export const isAr = (_: any) => {
  let isAr = I18nManager.isRTL;
  if (isAr) return true;
  else return false;
};
