import { I18nManager } from 'react-native';
import I18n from 'react-native-i18n';

// Import all locales
import en from './en.json';
import ar from './ar.json';
import RNRestart from 'react-native-restart';

// Should the app fallback to English if user locale doesn't exists
I18n.fallbacks = true;

// Define the supported translations
I18n.translations = {
  en,
  ar,
};

// Is it a RTL language?
export const isRTL = function () {
  const currentLocale = I18n.currentLocale();
  return currentLocale === 'ar';
};

// Allow RTL alignment in RTL languages
// I18nManager.allowRTL(false);

let AppLanguage = '';

if (I18nManager.isRTL) {
  AppLanguage = 'ar';
} else {
  AppLanguage = 'en';
}

export function getAppLanguage() {
  return AppLanguage;
}

export const setAppLanguage = async (lang: string, restart = true) => {
  AppLanguage = lang;
  if (lang === 'ar') {
    I18nManager.forceRTL(true);
  } else {
    I18nManager.forceRTL(false);
  }

  // await ReactNative.AsyncStorage.setItem('language', lang)
  if (restart) {
    RNRestart.Restart();
  }
};

export const Restart = (restart = true) => {
  if (restart) {
    RNRestart.Restart();
  }
};

// The method we'll use instead of a regular string
export function strings(name: string, params = {}) {
  params = { locale: AppLanguage };
  let current: string;
  let keys = name.split('.');
  return I18n.t(name, params);
}

export const which = (ltr: any, rtl: any) => {
  if (AppLanguage == 'ar') {
    return rtl;
  } else {
    return ltr;
  }
};

export default I18n;
