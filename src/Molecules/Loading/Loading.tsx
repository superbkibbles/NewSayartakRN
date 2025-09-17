import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import LottieView from 'lottie-react-native';
import { calcHeight, calcWidth } from '../../config/metrics';

type LoadingProps = {
  style?: StyleProp<ViewStyle>;
};
export default function Loading(params: LoadingProps) {
  return (
    <LottieView
      style={[{ width: calcWidth(60), height: calcHeight(100) }, params.style]}
      autoPlay
      loop={true}
      source={require('../../assets/lottie/Loading.json')}
    />
  );
}
