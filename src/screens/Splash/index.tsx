import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  getBrands,
  getCities,
  getNotViewedNotification,
  getAppSettings,
  makeApiCall,
} from '../../store/thunks/apiThunks';
// Removed old API import - using RTK thunks instead
import { setWarningVersion } from '../../store/slices/persistSlice';
import NavigationService from '../../navigation/NavigationService';
import SplashView from './SplashView';
import { getAppInfo } from '../../utils/functions';

function Splash() {
  const dispatch = useAppDispatch();

  // Select state using typed selectors
  const carData = useAppSelector(state => state.persist.carData);
  const token = useAppSelector(state => state.persist.token);
  const brands = useAppSelector(state => state.persist.brands);
  const skipThisVersion = useAppSelector(
    state => state.persist.skipThisVersion,
  );

  useEffect(() => {
    // Load initial data
    dispatch(getCities());
    dispatch(getBrands());

    // Load brand modals if a brand is selected
    if (carData.brand !== -1 && brands.length > 0) {
      const selectedBrand = brands.find(brand => brand.id === carData.brand);
      if (selectedBrand) {
        dispatch(
          makeApiCall({
            actionType: 'GET_BRAND_MODALS',
            requestMethod: 'GET',
            serviceUrl: `/cars/brands/${selectedBrand.id}/models/`,
            setHeader: false,
            presist: false,
          }),
        );
      }
    }

    // Load notification count if user is logged in
    if (token) {
      dispatch(getNotViewedNotification());
    }

    // Load app settings and handle navigation
    const initializeApp = async () => {
      try {
        const appInfo = (await getAppInfo()) as any;
        console.log('App Info:', appInfo);

        console.log('Calling getAppSettings...');
        const result = await dispatch(
          getAppSettings({
            platform: appInfo.platform ?? 'ios',
            version: appInfo.version ?? '1.0.0',
          }),
        ).unwrap();

        console.log('App settings result:', result);

        // Handle app settings response
        const data = result.data;

        setTimeout(() => {
          if (data?.status === 'force_update') {
            NavigationService.replace('ForceUpdateApp', undefined);
          } else {
            if (
              skipThisVersion < parseInt(data?.current_version, 10) &&
              data.status === 'warning_update'
            ) {
              dispatch(setWarningVersion({ isShow: true, version: undefined }));
            }
            NavigationService.replace('Tabs', undefined);
          }
        }, 2000);
      } catch (error) {
        console.error('Failed to load app settings:', error);
        // Fallback navigation
        setTimeout(() => {
          NavigationService.replace('Tabs', undefined);
        }, 2000);
      }
    };

    initializeApp();
  }, [dispatch, carData.brand, token, brands, skipThisVersion]);

  return (
    <SplashView
      carData={carData}
      token={token}
      brands={brands}
      skipThisVersion={skipThisVersion}
    />
  );
}

export default Splash;
