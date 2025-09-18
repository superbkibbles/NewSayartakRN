import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { calcWidth } from '../../config/metrics';

type ViewRowProps = {
  style?: StyleProp<ViewStyle>;
  withoutPadding?: boolean;
  children?: React.ReactNode;
};
export function ViewRow(params: ViewRowProps) {
  return (
    <View
      style={[
        {
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: !params.withoutPadding ? calcWidth(15) : 0,
        },
        params.style,
      ]}
    >
      {params.children}
    </View>
  );
}
