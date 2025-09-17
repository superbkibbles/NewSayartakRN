import React, { useState, useRef, useEffect } from 'react';
import { StyleProp, ViewStyle, View, Animated, Easing } from 'react-native';
import LottieView from 'lottie-react-native';

import { RFValue } from 'react-native-responsive-fontsize';
import { Text_ } from '../Text/Text';
import { config } from '../../config/appConfig';

type DoneProps = {
  style?: StyleProp<ViewStyle>;
  text: String;
};
export default function EmptyCars(params: DoneProps) {
  let viewOpacity = useRef(new Animated.Value(0)).current;
  let textOpacity = useRef(new Animated.Value(0)).current;
  let top = useRef(new Animated.Value(-100)).current;
  let topText = useRef(new Animated.Value(-40)).current;
  //   let [isFinshed, setIsFinshed] = useState(true);

  useEffect(() => {
    // setIsFinshed(false);
    Animated.timing(viewOpacity, {
      duration: 2000,
      toValue: 0.6,
      easing: Easing.elastic(),
      delay: 300,
      useNativeDriver: true,
    }).start();
    Animated.timing(textOpacity, {
      duration: 1000,
      toValue: 0.6,
      easing: Easing.elastic(),
      delay: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(top, {
      duration: 1000,
      toValue: 0,
      easing: Easing.elastic(),
      delay: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(topText, {
      duration: 1000,
      toValue: 0,
      easing: Easing.elastic(),
      delay: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={{ alignItems: 'center', marginTop: params.marginTop }}>
      <Animated.View
        style={{
          width: RFValue(220, 812),
          height: RFValue(220, 812),
          opacity: viewOpacity,
          alignItems: 'center',
          borderRadius: RFValue(220 / 2, 812),
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: config.colors.BORDER_COLOR,
          transform: [{ translateY: top }],
        }}
      >
        <LottieView
          style={[{ width: '100%', height: '100%' }, params.style]}
          autoPlay
          loop={true}
          source={require('../../assets/lottie/emptyCars.json')}
        />
      </Animated.View>
      <Text_
        fontSize={'14'}
        color={config.colors.BASE_COLOR}
        style={{
          marginTop: 20,
          opacity: textOpacity,
          transform: [{ translateY: topText }],
        }}
      >
        {params.text}
      </Text_>
    </View>
  );
}
