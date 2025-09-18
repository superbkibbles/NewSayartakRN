import React, { useEffect, useState } from 'react';
import { View, Linking } from 'react-native';
import Modal from 'react-native-modal';
import { calcHeight, calcWidth } from '../../../config/metrics';
import { RFValue } from 'react-native-responsive-fontsize';
import { Button } from '../../Button/Button';
import { Text_ } from '../../../Molecules';
import { getAppInfo } from '../../../utils/functions';
import RocketUpdateApp from '../../../Atoms/RocketUpdateApp/RocketUpdateApp';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { setWarningVersion } from '../../../store/slices/persistSlice';

type UpdateVersionModalProps = {
  isVisible?: Boolean;
  onSubmit?: Function;
  onCancel?: Function;
  data?: Array<any>;
};

function UpdateVersionModal(params: UpdateVersionModalProps) {
  const dispatch = useAppDispatch();
  const showWarningUpdateVersion = useAppSelector(
    state => state.persist.showWarningUpdateVersion,
  );
  const settings = useAppSelector(state => state.appSettings.settings);

  let [isVisible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVisible(showWarningUpdateVersion);
    }, 5000);
  }, [showWarningUpdateVersion]);

  const onClose = () => {
    setVisible(false);
    dispatch(
      setWarningVersion({
        isShow: false,
        version: settings.current_version
          ? parseInt(settings.current_version)
          : undefined,
      }),
    );
  };

  const onUpdate = async () => {
    let url = 'https://apps.apple.com/us/app/syartk/id1543990290';
    let appInfo = await getAppInfo();
    if (appInfo.platform === 'android') {
      let isHuaweid = appInfo.deviceName.toLowerCase().includes('huaweid');
      url = isHuaweid
        ? 'https://appgallery.huawei.com/#/app/C103522793'
        : 'https://play.google.com/store/apps/details?id=com.syartk';
    }
    dispatch(setWarningVersion({ isShow: false }));
    setVisible(false);
    setTimeout(() => {
      Linking.openURL(url);
    }, 300);
  };
  return (
    <Modal
      animationInTiming={500}
      animationOutTiming={500}
      animationOut={'fadeOutDown'}
      animationIn={'fadeInUp'}
      backdropOpacity={0.4}
      style={{
        padding: 0,
        margin: 0,
        justifyContent: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
      isVisible={isVisible}
    >
      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            width: calcWidth(289),
            minHeight: calcHeight(150),
            backgroundColor: 'white',
            borderRadius: RFValue(10, 812),
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: calcHeight(25),
          }}
        >
          <Button
            onPress={onClose}
            iconStyle={{
              width: RFValue(16, 812),
              height: RFValue(16, 812),
              color: '#6A6A6A',
            }}
            iconName="close"
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              padding: calcWidth(20),
            }}
          />

          <RocketUpdateApp
            style={{ width: RFValue(200, 812), height: RFValue(200, 812) }}
          />

          {/* <Icons name={"update"} width={RFValue(102, 812)} height={RFValue(102, 812)} /> */}
          <Text_ fontFamily="bold" fontSize={'18'} style={{}}>
            {'تحديث جديد'}
          </Text_>
          <Text_
            fontFamily="medium"
            style={{ marginTop: calcHeight(18), width: calcWidth(230) }}
            color={'#B5B5B5'}
            textAlign="center"
          >
            {settings.user_msg}
          </Text_>
          <Button
            onPress={onUpdate}
            style={{ width: calcWidth(181), height: calcHeight(35) }}
            defaultStyle
            text={'تحديث الان'}
          />
          <Button
            onPress={onClose}
            textStyle={{ fontSize: '14' }}
            style={{ padding: RFValue(10), marginTop: calcHeight(7) }}
            text={'ليس الان'}
          />
        </View>
      </View>
    </Modal>
  );
}
export default UpdateVersionModal;
