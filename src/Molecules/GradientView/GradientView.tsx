import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { config } from '../../config/appConfig';
import { Animated, StyleProp, ViewStyle } from 'react-native';

type GradientViewProps = {
  style?: StyleProp<ViewStyle>;
};
export function GradientView(params: GradientViewProps) {
  const AnimatedGradientView = Animated.createAnimatedComponent(LinearGradient);
  return (
    <AnimatedGradientView
      start={{ x: 1, y: 0.9 }}
      end={{ x: 1, y: 0 }}
      // end={[1.0]}
      // start={[1, .9]}
      colors={config.colors.GRADIENT_BASE_COLORS}
      style={[params.style, params.style]}
    >
      {params.children}
    </AnimatedGradientView>
  );
}
