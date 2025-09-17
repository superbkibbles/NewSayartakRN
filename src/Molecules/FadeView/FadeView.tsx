import React, { useEffect, useRef } from 'react';
import { Animated, Easing, ViewStyle, StyleProp } from 'react-native';

type FadeViewProps = {
  style?: StyleProp<ViewStyle>;
  isActive: Boolean;
};
function FadeView(params: FadeViewProps) {
  let opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: params.isActive ? 1 : 0,
      duration: params.duration || 700,
      easing: Easing.elastic(),
    }).start();
  }, [params.isActive]);

  return (
    <Animated.View
      style={[
        {
          width: '100%',
          position: params.isActive ? undefined : 'absolute',
          opacity: opacity,
          zIndex: params.isActive ? 10 : 0,
          alignItems: 'center',
        },
        params.style,
      ]}
    >
      {params.children}
    </Animated.View>
  );
}

export { FadeView };
