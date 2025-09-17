import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, ActivityIndicator, Image } from 'react-native';
import images from '../../config/images';
import { config } from '../../config/appConfig';
import { Icons } from '../../config/icons';
import { calcHeight, calcWidth } from '../../config/metrics';
import { RFValue } from 'react-native-responsive-fontsize';

function SplashView() {
  let opacity = useRef(new Animated.Value(0.1)).current;
  let scale = useRef(new Animated.Value(0)).current;
  let height = useRef(new Animated.Value(calcHeight(900.32))).current;
  let width = useRef(new Animated.Value(calcWidth(846.52))).current;
  let y = useRef(new Animated.Value(-calcHeight(42))).current;
  let logoTextY = useRef(new Animated.Value(calcHeight(147.84))).current;

  let carTranslateY = useRef(new Animated.Value(calcHeight(197))).current;
  let scaleCar = useRef(new Animated.Value(1)).current;

  let carOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      easing: Easing.elastic(1),
      delay: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(height, {
      toValue: RFValue(181.42),
      duration: 1000,
      easing: Easing.elastic(1),
      delay: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(width, {
      toValue: RFValue(177.89),
      duration: 1000,
      easing: Easing.elastic(1),
      delay: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(y, {
      toValue: calcHeight(200.84),
      duration: 1000,
      easing: Easing.elastic(1),
      delay: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(scale, {
      toValue: 1,
      duration: 1000,
      easing: Easing.elastic(1),
      delay: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(logoTextY, {
      toValue: calcHeight(424),
      duration: 1000,
      easing: Easing.elastic(1),
      delay: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(carOpacity, {
      toValue: 0,
      duration: 500,
      easing: Easing.elastic(1),
      delay: 1000,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(carOpacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.elastic(1),
        useNativeDriver: true,
      }).start();
    });
    Animated.timing(carTranslateY, {
      toValue: calcHeight(1000),
      duration: 1000,
      easing: Easing.elastic(1),
      delay: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(scaleCar, {
      toValue: 10,
      duration: 1000,
      easing: Easing.elastic(1),
      delay: 500,
      useNativeDriver: true,
    }).start(() => {});
  }, [
    opacity,
    height,
    width,
    y,
    scale,
    logoTextY,
    carOpacity,
    carTranslateY,
    scaleCar,
  ]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: config.colors.BLACK,
        alignItems: 'center',
      }}
    >
      {/* car  */}
      <Animated.View
        style={{
          opacity: carOpacity,
          position: 'absolute',
          width: calcWidth(95),
          height: calcHeight(54),
          transform: [{ translateY: carTranslateY }, { scale: scaleCar }],
        }}
      >
        <Image style={{ width: '100%', height: '100%' }} source={images.car} />
      </Animated.View>

      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: config.colors.rgbaLightBlue(0.2),
        }}
      />

      <Animated.View
        style={{
          opacity: scale,
          width: RFValue(131.54),
          height: RFValue(91.53),
          position: 'absolute',
          transform: [{ translateY: logoTextY }, { scale: scale }],
        }}
      >
        <Icons
          name={'logoText'}
          width={RFValue(131.54)}
          height={RFValue(91.53)}
          color={'' as any}
          rotate={false}
          icon={() => null}
        />
      </Animated.View>

      <Animated.View
        style={{
          opacity: opacity,
          width: width,
          height: height,
          position: 'absolute',
          transform: [{ translateY: y }],
        }}
      >
        <Image
          resizeMode={'contain'}
          style={{ width: '100%', height: '100%' }}
          source={images.logo}
        />
      </Animated.View>

      <ActivityIndicator
        color={'white'}
        size={'small'}
        style={{ top: calcHeight(700), position: 'absolute' }}
      />
    </View>
  );
}

export default SplashView;
