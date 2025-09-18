import React, { useEffect, useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Line, ViewRow } from '../../Molecules';
import { config } from '../../config/appConfig';
import { RFValue } from 'react-native-responsive-fontsize';
import { calcHeight, calcWidth } from '../../config/metrics';
import { Button } from '../Button/Button';
import { useAppDispatch } from '../../store/hooks';
import { changeLayout } from '../../store/slices/appSettingsSlice';

type LayoutAndSortingCarsProps = {
  style?: StyleProp<ViewStyle>;
  onSorting: Function;
  onChangeLayout: Function;
};
function LayoutAndSortingCars(params: LayoutAndSortingCarsProps) {
  const dispatch = useAppDispatch();
  const [layout, setLayout] = useState(params.layout);

  useEffect(() => {
    setLayout(params.layout);
  }, [params.layout]);

  const onPress = (type: string) => {
    dispatch(
      changeLayout({ layout: type, component_type: params.component_type }),
    );
  };

  return (
    <ViewRow style={{ paddingVertical: calcHeight(6) }}>
      <ViewRow
        style={{
          width: calcWidth(70),
          backgroundColor: config.colors.WHITE,
          paddingHorizontal: calcWidth(10),
          height: calcHeight(35),
          alignItems: 'center',
          borderWidth: 1,
          borderColor: config.colors.BORDER_COLOR,
          borderRadius: calcHeight(35 / 2),
        }}
      >
        <Button
          onPress={() => onPress('big')}
          iconStyle={{
            color:
              layout === 'big' ? config.colors.BASE_COLOR : config.colors.GRAY,
            width: RFValue(13, 812),
            height: RFValue(13, 812),
          }}
          style={{ height: '100%', alignItems: 'center' }}
          iconName={'smallLayout'}
          textStyle={{ fontSize: '10', color: config.colors.BLACK }}
        />
        <Line size={'100%'} verticalLine />
        <Button
          onPress={() => onPress('small')}
          style={{ height: '100%', alignItems: 'center' }}
          iconStyle={{
            color:
              layout === 'small'
                ? config.colors.BASE_COLOR
                : config.colors.GRAY,
            width: RFValue(13, 812),
            height: RFValue(13, 812),
          }}
          iconName={'listLayout'}
          textStyle={{ fontSize: '10', color: config.colors.BLACK }}
        />
      </ViewRow>
      <Button
        onPress={params.onSorting}
        iconStyle={{
          color: config.colors.BASE_COLOR,
          width: RFValue(12, 812),
          height: RFValue(12, 812),
        }}
        style={{
          backgroundColor: config.colors.WHITE,
          paddingHorizontal: calcWidth(10),
          height: calcHeight(35),
          alignItems: 'center',
          borderWidth: 1,
          borderColor: config.colors.BORDER_COLOR,
          borderRadius: calcHeight(35 / 2),
        }}
        text={
          params.selectedIndex != -1
            ? params.data[params.selectedIndex].name
            : 'رتب حسب'
        }
        iconName={
          params.selectedIndex != -1
            ? params.data[params.selectedIndex].iconName
            : undefined
        }
        textStyle={{ fontSize: '10', color: config.colors.BLACK }}
      />
    </ViewRow>
  );
}

export default LayoutAndSortingCars;
