import React from 'react';
import { ViewStyle, StyleProp, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { config } from '../../config/appConfig';
import { Text_ } from '../../Molecules';
import { Image_ } from '../../Molecules/Image/Image';
import { SvgCssUri } from 'react-native-svg';
import styles from './styles';
import ButtonScale from '../ButtonScale/ButtonScale';

type BrandItemProps = {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  icon: string;
  name: string;
};
export function BrandItem(params: BrandItemProps) {
  let isSvg = params.icon.indexOf('.svg') !== -1;
  return (
    <ButtonScale
      activeScale={0.9}
      tension={50}
      friction={7}
      useNativeDriver
      onPress={params.onPress}
    >
      <View style={[styles.brandItem_container, params.style]}>
        {isSvg ? (
          <SvgCssUri
            width={RFValue(50, 812)}
            height={RFValue(50, 812)}
            uri={params.icon}
          />
        ) : (
          <Image_
            resizeMode={'contain'}
            style={styles.icon}
            source={{ uri: params.icon }}
          />
        )}
        <Text_
          style={styles.text}
          color={config.colors.GRAY}
          fontFamily={'regular'}
          fontSize={'10'}
        >
          {params.name}
        </Text_>
      </View>
    </ButtonScale>
  );
}
