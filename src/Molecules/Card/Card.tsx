import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { config } from '../../config/appConfig';
// import { Icons } from '../../config/icons';
import { calcHeight, calcWidth } from '../../config/metrics';
// import { Text_ } from '../Text/Text';
import { ViewStyle, StyleProp } from 'react-native';
import { ViewRow } from '../ViewRow/ViewRow';

type CardProps = {
  style?: StyleProp<ViewStyle>;
};
export function Card(params: CardProps) {
  return (
    <ViewRow
      style={[
        {
          width: calcWidth(355),
          backgroundColor: config.colors.WHITE,
          borderTopWidth: 1,
          borderColor: config.colors.BORDER_COLOR,
          borderRadius: RFValue(5, 812),
          borderWidth: 1,
          marginTop: calcHeight(10),
          paddingVertical: !params.withoutPadding ? calcWidth(8) : 0,
        },
        params.style,
      ]}
    >
      {params.children}
    </ViewRow>
  );
}
