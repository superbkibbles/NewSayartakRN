import React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { Text_ } from '../../Molecules';
import styles from './styles';
import { FontFamilyType } from '../types';
import { config } from '../../config/appConfig';
import { RFValue } from 'react-native-responsive-fontsize';
import { Icons, IconsName } from '../../config/icons';
type TabButtonsProps = {
  style?: StyleProp<ViewStyle>;
  textStyle?: {
    fontFamily: FontFamilyType;
    color: string;
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
  };
  iconStyle?: {
    width?: number;
    color?: string;
    height?: number;
    scale?: boolean;
  };
  iconName?: IconsName;
  text?: string;
  onPress?: (event?: any) => void;
  activeOpacity?: number;
  defaultStyle?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
};
export function Button(params: TabButtonsProps) {
  return (
    <TouchableOpacity
      disabled={params.disabled}
      activeOpacity={params.activeOpacity}
      onPress={params.onPress}
      style={[
        {
          flexDirection: 'row',
        },
        params.defaultStyle && styles.buttonStyle,
        params.style,
      ]}
    >
      {params.text && (
        <Text_
          fontFamily={
            (params.textStyle && params.textStyle.fontFamily) || 'medium'
          }
          fontSize={(params.textStyle && params.textStyle.fontSize) || '15'}
          color={
            (params.textStyle && params.textStyle.color) ||
            (params.defaultStyle ? config.colors.WHITE : config.colors.GRAY)
          }
          style={[styles.textStyle]}
        >
          {params.text}
        </Text_>
      )}
      {params.iconName && (
        <Icons
          scale={params.iconStyle?.scale || false}
          color={params.iconStyle?.color || 'black'}
          width={
            params.iconStyle?.width ? params.iconStyle.width : RFValue(15, 812)
          }
          height={
            params.iconStyle?.height
              ? params.iconStyle.height
              : RFValue(15, 812)
          }
          name={params.iconName}
        />
      )}
      {params.children}
    </TouchableOpacity>
  );
}

Button.defaultProps = {
  style: {},
  iconStyle: {
    color: 'black',
    width: RFValue(15, 812),
    height: RFValue(15, 812),
  },
};
