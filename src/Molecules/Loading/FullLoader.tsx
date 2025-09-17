import React, { useEffect } from 'react';
import {
  StyleProp,
  ViewStyle,
  View,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { calcHeight } from '../../config/metrics';
import { RFValue } from 'react-native-responsive-fontsize';
import { config } from '../../config/appConfig';

type FullLoaderProps = {
  style?: StyleProp<ViewStyle>;
  text: String;
  isLoading: Boolean;
};
export default function FullLoader(params: FullLoaderProps) {
  useEffect(() => {}, [params.isLoading]);

  return (
    <Modal
      statusBarTranslucent
      transparent
      visible={params.isLoading ? params.isLoading : false}
    >
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: calcHeight(),
          backgroundColor: config.colors.rgbaBlack(0.3),
          alignItems: 'center',
          justifyContent: 'center',
        }}
        // viewRef={this.state.viewRef}
        blurType="xlight"
        blurAmount={1}
        reducedTransparencyFallbackColor="white"
      >
        <View
          style={{
            width: RFValue(90, 812),
            height: RFValue(90, 812),
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: RFValue(10, 812),
          }}
        >
          <ActivityIndicator size="large" color={config.colors.BASE_COLOR} />
        </View>
      </View>
    </Modal>
  );
}
