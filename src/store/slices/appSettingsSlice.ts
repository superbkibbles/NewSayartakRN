import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GearboxOption {
  id: string;
  name: string;
  name_en: string;
}

interface FuelTypeOption {
  id: string;
  name: string;
  name_en: string;
}

interface SpecificationOption {
  id: string;
  name: string;
  name_en: string;
}

interface SortingItem {
  id: string;
  iconName: string;
  name: string;
  sortingKye: string;
}

interface AppSettingsState {
  homeCarsLayout: string;
  resultCarsLayout: string;
  showroomCarsLayout: string;
  showRoomsLayout: string;
  gearboxs: GearboxOption[];
  fuelTypes: FuelTypeOption[];
  engineCapacity: string[];
  specifications: SpecificationOption[];
  sorting_items: SortingItem[];
  settings: any;
}

const initialState: AppSettingsState = {
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
  settings: {},
};

const appSettingsSlice = createSlice({
  name: 'appSettings',
  initialState,
  reducers: {
    changeLayout: (
      state,
      action: PayloadAction<{ layout: string; component_type: string }>,
    ) => {
      const { layout, component_type } = action.payload;
      if (component_type in state) {
        (state as any)[component_type] = layout;
      }
    },

    setAppSettings: (state, action: PayloadAction<any>) => {
      state.settings = action.payload;
    },
  },
});

export const { changeLayout, setAppSettings } = appSettingsSlice.actions;

export type {
  AppSettingsState,
  GearboxOption,
  FuelTypeOption,
  SpecificationOption,
  SortingItem,
};
export default appSettingsSlice.reducer;
