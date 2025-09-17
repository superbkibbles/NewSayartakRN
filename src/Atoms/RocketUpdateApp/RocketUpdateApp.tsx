import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import LottieView from 'lottie-react-native';
import { calcHeight, calcWidth } from '../../config/metrics';

type RocketUpdateAppProps = {
  style?: StyleProp<ViewStyle>;
};
export default function RocketUpdateApp(params: RocketUpdateAppProps) {
  return (
    <LottieView
      style={[{ width: calcWidth(200), height: calcHeight(200) }, params.style]}
      autoPlay
      loop={true}
      source={require('../../assets/lottie/Rocket.json')}
    />
  );
}
