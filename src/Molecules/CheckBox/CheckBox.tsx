import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { config } from '../../config/appConfig';
import { Icons } from '../../config/icons';
import { calcWidth } from '../../config/metrics';
import { Text_ } from '../Text/Text';
import { ViewStyle, StyleProp } from 'react-native';
// import { ViewRow } from '../ViewRow/ViewRow';
import { Button } from '../../components';

type CheckBoxProps = {
  style?: StyleProp<ViewStyle>;
  onSelected: Function;
  isSelected: Boolean;
};
export function CheckBox(params: CheckBoxProps) {
  const onSetSelected = () => {
    params.onSelected();
  };
  return (
    <Button
      activeOpacity={0.9}
      onPress={onSetSelected}
      style={{ flexDirection: 'row', alignItems: 'center' }}
    >
      <Icons
        name={'check'}
        width={RFValue(25, 812)}
        height={RFValue(25, 812)}
        color={params.isSelected ? config.colors.GREEN : config.colors.GRAY}
      />
      <Text_
        color={params.isSelected ? config.colors.GREEN : config.colors.GRAY}
        fontSize={'15'}
        style={{ paddingHorizontal: calcWidth(5) }}
      >
        {params.label}
      </Text_>
    </Button>
  );
}
