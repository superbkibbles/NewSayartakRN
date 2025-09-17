import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { config } from '../../config/appConfig';
import { Icons, IconsName } from '../../config/icons';
import { calcHeight, calcWidth } from '../../config/metrics';
import { Text_ } from '../Text/Text';
import { View, ViewStyle, StyleProp, TextProps } from 'react-native';
import { FontFamilyType } from '../../components/types';

type TextWithIconProps = {
  style?: StyleProp<ViewStyle>;
  iconName: IconsName;
  iconStyle: {
    width: String;
    height: String;
    color: String;
  };
  textStyle?: StyleProp<TextProps>;
  fontFamily: FontFamilyType;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  fontSize:
    | '8'
    | '9'
    | '10'
    | '11'
    | '12'
    | '13'
    | '14'
    | '15'
    | '16'
    | '17'
    | '18'
    | '19'
    | '20'
    | '21'
    | '22'
    | '23'
    | '24';
  textColor: String;
};
export function TextWithIcon(params: TextWithIconProps) {
  return (
    <View
      style={[
        {
          width: null,
          paddingHorizontal: 0,
          paddingVertical: calcHeight(12),
          flexDirection: 'row',
        },
        params.style,
      ]}
    >
      <Icons
        name={params.iconName}
        width={params.iconStyle.width || RFValue(19, 812)}
        height={params.iconStyle.height || RFValue(19, 812)}
        color={params.iconStyle.color || config.colors.GRAY}
      />
      <Text_
        color={params.textColor}
        textAlign={params.textAlign}
        fontFamily={params.fontFamily || 'light'}
        fontSize={params.fontSize || '15'}
        style={[{ paddingHorizontal: calcWidth(5) }, params.textStyle]}
      >
        {params.text}
      </Text_>
    </View>
  );
}
