import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import LottieView from 'lottie-react-native';
import { calcHeight, calcWidth } from '../../config/metrics';


type DoneProps = {
    style?: StyleProp<ViewStyle>;
}
export default function Done(params:DoneProps) {
    return (
        <LottieView
            style={[{ width: calcWidth(200), height: calcHeight(200) }, params.style]}
            autoPlay
            loop={true}
            source={require('../../assets/lottie/done.json')}
        />
    );

}  