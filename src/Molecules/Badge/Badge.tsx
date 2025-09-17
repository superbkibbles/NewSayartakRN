import React from 'react';
import { config } from '../../config/appConfig';
import { View, ViewStyle, StyleProp } from 'react-native';
import { calcHeight, calcWidth } from '../../config/metrics';
import { Text_ } from '../Text/Text';
import { RFValue } from 'react-native-responsive-fontsize';

type BadgeProps = {
  count: number;
  style?: StyleProp<ViewStyle>;
};
export function Badge(params: BadgeProps) {
  return params.count !== 0 ? (
    <View
      style={[
        {
          height: RFValue(19, 812),
          backgroundColor: config.colors.RED,
          borderRadius: RFValue(19 / 2, 812),
          paddingHorizontal: calcWidth(1),
          position: 'absolute',
          minWidth: RFValue(19, 812),
          alignItems: 'center',
          justifyContent: 'center',
        },
        params.style,
      ]}
    >
      <Text_
        fontSize={'11'}
        fontFamily={'null'}
        color={config.colors.WHITE}
        style={{ paddingHorizontal: calcWidth(5) }}
      >
        {params.count}
      </Text_>
    </View>
  ) : (
    <View />
  );
}
