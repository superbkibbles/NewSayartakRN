/**
 * Loading reducer made seperate for easy blacklisting
 * Avoid data persist
 */
import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
const initialState = {
  homeCarsLayout: 'big',
  resultCarsLayout: 'big',
  showroomCarsLayout: 'big',
  showRoomsLayout: 'big',
  gearboxs: [
    {
      id: '1',
      name: 'عادي',
      name_en: 'manual',
    },
    {
      id: '2',
      name: 'اوتوماتيك',
      name_en: 'automatic',
    },
  ],
  fuelTypes: [
    {
      id: '1',
      name: 'بنزين',
      name_en: 'gas',
    },
    {
      id: '2',
      name: 'ديزل',
      name_en: 'diesel',
    },
    {
      id: '3',
      name: 'هايبرد/هجين',
      name_en: 'hyper',
    },
    {
      id: '4',
      name: 'كهرباء',
      name_en: 'electric',
    },
  ],
  engineCapacity: [
    '1.0',
    '1.1',
    '1.2',
    '1.3',
    '1.4',
    '1.5',
    '1.6',
    '1.7',
    '1.8',
    '1.9',

    '2.0',
    '2.1',
    '2.2',
    '2.3',
    '2.4',
    '2.5',
    '2.6',
    '2.7',
    '2.8',
    '2.9',

    '3.0',
    '3.1',
    '3.2',
    '3.3',
    '3.4',
    '3.5',
    '3.6',
    '3.7',
    '3.8',
    '3.9',

    '4.0',
    '4.1',
    '4.2',
    '4.3',
    '4.4',
    '4.5',
    '4.6',
    '4.7',
    '4.8',
    '4.9',

    '5.0',
    '5.1',
    '5.2',
    '5.3',
    '5.4',
    '5.5',
    '5.6',
    '5.7',
    '5.8',
    '5.9',

    '6.0',
    '6.1',
    '6.2',
    '6.3',
    '6.4',
    '6.5',
    '6.6',
    '6.7',
    '6.8',
    '6.9',

    '7.0',
    '7.1',
    '7.2',
    '7.3',
    '7.4',
    '7.5',
    '7.6',
    '7.7',
    '7.8',
    '7.9',
  ],
  specifications: [
    {
      id: '2',
      name: 'ستاندر',
      name_en: 'standard',
    },
    {
      id: '3',
      name: 'فل',
      name_en: 'full',
    },
    {
      id: '4',
      name: 'نص فل',
      name_en: 'half full',
    },
  ],

  sorting_items: [
    {
      id: '1',
      iconName: 'highPrice',
      name: 'اعلي سعر',
      sortingKye: '-car_price',
    },
    {
      id: '2',
      iconName: 'lowPrice',
      name: 'اقل سعر',
      sortingKye: 'car_price',
    },
    {
      id: '3',
      iconName: 'refresh',
      name: 'وصل حديثا',
      sortingKye: '-created_at',
    },
  ],
  settings: {} as any,
};

type AppSettingsState = typeof initialState;
type AnyAction = { type: string; [key: string]: any };

export const appSettingsReducer = createReducer<AppSettingsState, AnyAction>(
  initialState,
  {
    [types.CHANGE_LAYOUT](state: AppSettingsState, action: AnyAction) {
      return {
        ...state,
        [action.component_type as keyof AppSettingsState]: action.layout,
      };
    },
    [types.APP_SETTINGS](state: AppSettingsState, action: AnyAction) {
      return {
        ...state,
        settings: action.response,
      };
    },
  },
);
