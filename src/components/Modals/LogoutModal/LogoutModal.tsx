import React from 'react';
import { View } from 'react-native';

import Modal from 'react-native-modal';
import { calcHeight, calcWidth } from '../../../config/metrics';
import { RFValue } from 'react-native-responsive-fontsize';
import { config } from '../../../config/appConfig';
import { Button } from '../../Button/Button';
import { Icons } from '../../../config/icons';
import SwipeableModal from '../../SwipeableModal/SwipeableModal';
import { Text_ } from '../../../Molecules';

type LogoutModalProps = {
  isVisible: Boolean;
  onSubmit: Function;
  onCancel: Function;
  data: Array<any>;
};
export function LogoutModal(params: LogoutModalProps) {
  return (
    <Modal
      animationInTiming={300}
      animationOutTiming={300}
      animationOut={'fadeOutDown'}
      animationIn={'fadeInUp'}
      backdropOpacity={0.4}
      // backdropColor={"white"}
      style={{ padding: 0, margin: 0, justifyContent: 'flex-end' }}
      isVisible={params.isVisible}
    >
      <SwipeableModal
        onCancel={params.onCancel}
        isActive={true}
        height={calcHeight(350)}
      >
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            marginTop: calcHeight(10),
          }}
        >
          <Icons
            name={'logout'}
            color={'red'}
            style={{ width: RFValue(35, 812), height: RFValue(35, 812) }}
          />
          <Text_ style={{ marginTop: calcHeight(30) }}>
            {'هل تريد تسجيل الدخول ؟'}
          </Text_>
          {/* <ViewRow> */}
          <Button
            onPress={params.onSubmit}
            style={{ width: calcWidth(320), marginTop: calcHeight(20) }}
            text={'نعم'}
            defaultStyle
          />
          <Button
            onPress={params.onCancel}
            style={{
              width: calcWidth(320),
              borderWidth: 2,
              borderColor: config.colors.BASE_COLOR,
              backgroundColor: 'white',
            }}
            textStyle={{ color: config.colors.BASE_COLOR }}
            text={'الغاء'}
            defaultStyle
          />

          {/* </ViewRow> */}
        </View>
      </SwipeableModal>
    </Modal>
  );
}
