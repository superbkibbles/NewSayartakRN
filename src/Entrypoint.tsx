/**
 * React Native App
 * Everthing starts from the entrypoint
 */
import React, { Component } from 'react';
import { ActivityIndicator, StatusBar, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import Navigator from '../src/navigation';
import configureStore from '../src/store/configureStore';
import moment from 'moment';
import 'moment/locale/ar';
import { getAppLanguage } from './Local/i18n';
import { CustomToast } from './components/CustomToast/index';
// import { UpdateVersionModal } from './components/Modals/UpdateVersionModal/UpdateVersionModal';
// import OneSignal from 'react-native-onesignal';
const { persistor, store } = configureStore();

export default class Entrypoint extends Component {
  componentDidMount = async () => {
    if (getAppLanguage() === 'ar') moment.locale('ar');
    else moment.locale('en');

    //     /* O N E S I G N A L   S E T U P */
    //     OneSignal.setAppId('e48ad017-2143-4023-859e-4da8c734cf8a');
    //     OneSignal.setLogLevel(6, 0);
    //     OneSignal.setRequiresUserPrivacyConsent(false);
    //     OneSignal.promptForPushNotificationsWithUserResponse(response => {});
    //     /* O N E S I G N A L  H A N D L E R S */
    //     OneSignal.setNotificationWillShowInForegroundHandler(notifReceivedEvent => {
    //       // let notif = notifReceivedEvent.getNotification();
    //     });
    //     OneSignal.setNotificationOpenedHandler(notification => {});

    //     OneSignal.setInAppMessageClickHandler(event => {});
    //     OneSignal.addEmailSubscriptionObserver(event => {});
    //     OneSignal.addSubscriptionObserver(event => {});
    //     OneSignal.addPermissionObserver(event => {});
  };

  render() {
    // console.disableYellowBox = true;

    return (
      //   <View></View>
      <Provider store={store}>
        <StatusBar
          backgroundColor="transparent"
          translucent={true}
          barStyle="light-content"
        />

        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <Navigator />
          <CustomToast />
          {/* <View>
            <Text>Hello World</Text>
          </View> */}
        </PersistGate>
      </Provider>
    );
  }
}
