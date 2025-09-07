import { isIos } from './func';

/*
 * Provides universal color configs used in the app.
 * Provides universal fonts used in the app.
 */

const AppStyles = {
  color: {
    BASE_COLOR: '#277EF5',
  },
  fonts: {
    bold: isIos() ? 'Bahij Janna' : 'Bahij Janna-Bold',
    regular: isIos() ? 'Bahij Janna' : 'Bahij Janna-Regular',
    Tajawal_Black: 'Tajawal-Black',
    Tajawal_Bold: 'Tajawal-Bold',
    Tajawal_ExtraBold: 'Tajawal-ExtraBold',
    Tajawal_ExtraLight: 'Tajawal-ExtraLight',
    Tajawal_Light: 'Tajawal-Light',
    Tajawal_Medium: 'Tajawal-Medium',
    Tajawal_Regular: 'Tajawal-Regular',
  },
};
export default AppStyles;
