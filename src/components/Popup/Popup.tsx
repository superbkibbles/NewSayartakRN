import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { config } from '../../config/appConfig';
import { Icons } from '../../config/icons';
import { calcHeight, calcWidth } from '../../config/metrics';
import { Text_, ViewRow } from '../../Molecules';

import { Button } from '../Button/Button';
import Modal from 'react-native-modal';

type PopupProps = {
  onPress: Function;
  title: String;
  body: String;
  time: String;
  isVisible: Boolean;
};

export function Popup(params: PopupProps) {
  let [isVisible, setVisible] = useState(params.isVisible);
  useEffect(() => {
    setVisible(params.isVisible);
  }, [params.isVisible]);

  return (
    <Modal
      style={{ padding: 0, margin: 0 }}
      animationIn={'pulse'}
      animationOut={'zoomOut'}
      isVisible={isVisible}
    >
      <View
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            width: calcWidth(340),
            height: calcHeight(200),
            borderRadius: RFValue(15, 812),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icons
            name={params.iconName || 'car'}
            color={params.iconColor || config.colors.BASE_COLOR}
            width={RFValue(40, 812)}
            height={RFValue(40, 812)}
          />
          <Text_ fontSize={'25'} style={{ marginTop: calcHeight(10) }}>
            {params.body || 'هل تريد حذف السيارة ؟'}
          </Text_>
          <ViewRow style={{ marginTop: calcHeight(20) }}>
            <Button
              onPress={params.onClose}
              text={'الغاء'}
              defaultStyle
              style={{ width: calcWidth(150) }}
            />
            <Button
              onPress={params.onPress}
              text={params.bottonText || 'حذف'}
              defaultStyle
              style={{
                width: calcWidth(150),
                backgroundColor: config.colors.RED,
              }}
            />
          </ViewRow>
        </View>
      </View>
    </Modal>
  );
}
