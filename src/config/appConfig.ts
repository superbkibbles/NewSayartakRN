import { Platform } from 'react-native';

export type ColorsType =
  | 'BLUE'
  | 'GRAY'
  | 'BORDER_COLOR'
  | 'BACKGROUND'
  | 'WHITE'
  | 'BASE_COLOR'
  | 'GRADIENT_BASE_COLORS'
  | 'rgbaWhite'
  | 'rgbaBlack';

export const config = {
  appVersion: {
    android: 5,
    ios: 5,
  },

  server: {
    baseUrl: '',
  },
  fonts: {
    bold: 'Tajawal-Bold',
    light: 'Tajawal-Light',
    medium: 'Tajawal-Medium',
    regular: 'Tajawal-Regular',

    // bold: isIos() ? "GESSTextBold-Bold" : "ArbFONTS-GE-SS-Text-Bold_26",
    // light: isIos() ? "GESSTextLight-Light" : "ArbFONTS-GE_SS_TEXT_LIGHT",
    // medium: isIos() ? "GESSTextMedium-Medium" : "ArbFONTS-GE-SS-Text-Medium_26",
    // regular: isIos() ? "GESSTextLight-Light" : "ArbFONTS-GE_SS_TEXT_LIGHT"
  },
  colors: {
    BLUE2: '#4267B2',
    RED: '#EB4D4D',
    GREEN: '#02C900',
    ORANGE: 'orange',

    BLACK: 'black',
    BLUE: '#273192',
    LIGHT_BLUE: '#277EF5',
    GRAY: '#B5B5B5',
    BORDER_COLOR: '#EBEBEB',
    BACKGROUND: '#F4F6FC',
    WHITE: 'white',
    BASE_COLOR: '#00035f',
    GRADIENT_BASE_COLORS: ['#273192', '#00035f'],
    rgbaLightBlue: (opacity: any) => `rgba(39, 126, 245,${opacity})`,
    rgbaWhite: (opacity: any) => `rgba(255, 255, 255,${opacity})`,
    rgbaBlack: (opacity: any) => `rgba(0, 0, 0,${opacity})`,
  },
};
export const getAppVersion = () => {
  return config.appVersion[Platform.OS];
};

// 2020 - 10 - 14 19: 24: 01.970060 + 0200 Syartk[4511: 275299]Family: GE SS    Font: GESSTextUltraLight - UltraLight
// 2020 - 10 - 14 19: 24: 01.970117 + 0200 Syartk[4511: 275299]Family: GE SS    Font: GESSTextLight - Light
// 2020 - 10 - 14 19: 24: 01.970162 + 0200 Syartk[4511: 275299]Family: GE SS    Font: GESSTextItalic - LightItalic
// 2020 - 10 - 14 19: 24: 01.970213 + 0200 Syartk[4511: 275299]Family: GE SS    Font: GESSTextMedium - Medium
// 2020 - 10 - 14 19: 24: 01.970265 + 0200 Syartk[4511: 275299]Family: GE SS    Font: GESSTextBold - Bold
