import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { SvgIcon } from './svgIcon';

export type IconsName =
  | 'update'
  | 'check2'
  | 'eyeOf'
  | 'check'
  | 'edit'
  | 'activeStar'
  | 'iraqFlag'
  | 'apple'
  | 'facebook'
  | 'google'
  | 'refresh'
  | 'highPrice'
  | 'lowPrice'
  | 'close'
  | 'logoText'
  | 'logo'
  | 'masterCard'
  | 'imagePlaceholder'
  | 'car2'
  | 'user2'
  | 'shop2'
  | 'payment'
  | 'darkLinkedin'
  | 'darkYoutube'
  | 'darkInstagram'
  | 'darkTwitter'
  | 'darkFacebook'
  | 'lowAndHigh'
  | 'lowAndHigh'
  | 'notification'
  | 'user'
  | 'location'
  | 'shop'
  | 'add'
  | 'search'
  | 'racing'
  | 'listLayout'
  | 'smallLayout'
  | 'arrowBack'
  | 'clock'
  | 'eye'
  | 'star'
  | 'share'
  | 'phone'
  | 'whatsapp'
  | 'info'
  | 'logout'
  | 'termsAndCondation'
  | 'settings'
  | 'heart'
  | 'car';
export type IconsProps = {
  name?: IconsName;
  icon?: Function;
  color?: String;
  size?: Number;
  width?: Number;
  height?: Number;
  rotate?: Boolean;
  scale?: Boolean;
  style?: StyleProp<ViewStyle>;
};

function Icons(props: IconsProps) {
  switch (props.name) {
    case 'lowAndHigh':
    case 'notification':
    case 'user':
    case 'location':
    case 'shop':
    case 'add':
    case 'search':
    case 'racing':
    case 'smallLayout':
    case 'listLayout':
    case 'arrowBack':
    case 'clock':
    case 'eye':
    case 'star':
    case 'share':
    case 'phone':
    case 'whatsapp':
    case 'info':
    case 'logout':
    case 'settings':
    case 'termsAndCondation':
    case 'heart':
    case 'car':
    case 'shop2':
    case 'darkLinkedin':
    case 'darkYoutube':
    case 'darkInstagram':
    case 'darkTwitter':
    case 'darkFacebook':
    case 'payment':
    case 'user2':
    case 'car2':
    case 'imagePlaceholder':
    case 'masterCard':
    case 'logoText':
    case 'logo':
    case 'close':
    case 'highPrice':
    case 'lowPrice':
    case 'refresh':
    case 'apple':
    case 'facebook':
    case 'google':
    case 'iraqFlag':
    case 'activeStar':
    case 'edit':
    case 'check':
    case 'eyeOf':
    case 'check2':
    case 'update':
      return (
        <View style={props.style}>
          <SvgIcon {...props} scale={props.scale || false} />
        </View>
      );
    default:
      return props.icon ? props.icon() : null;
  }
}

Icons.defaultProps = {
  size: 14,
};
export { Icons };
