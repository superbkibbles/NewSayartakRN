import React from 'react';
import { config } from '../../config/appConfig';
import { View, ViewStyle, StyleProp } from 'react-native';

type LineProps = {
  style?: StyleProp<ViewStyle>;
  verticalLine?: boolean;
  size?: string | number;
  color?: string;
};
export function Line(params: LineProps) {
  return (
    <View
      style={[
        {
          height: params.verticalLine ? params.size : 1,
          width: params.verticalLine ? 1 : params.size,
          backgroundColor: params.color || config.colors.BORDER_COLOR,
        },
        params.style,
      ]}
    />
  );
}
