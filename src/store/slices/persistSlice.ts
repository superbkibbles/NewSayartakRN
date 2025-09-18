import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getAppVersion } from '../../config/appConfig';
import { getNexPage } from '../../utils/datesUtils';

// Define the car data interface
interface CarData {
  addTitle: string;
  images: any;
  brand: number;
  modal: number;
  year_manufacture: string;
  price: string;
  specification: number;
  walkway: string;
  used_status: string;
  engine: number;
  fuel_type: number;
  gearbox: number;
  details: string;
  full_name: string;
  phone: string;
  city: number;
  address: string;
}

// Define the profile interface
interface Profile {
  first_name: string;
  last_name: string;
  phone: string;
  city?: number;
  address: string;
  favourite_cars_count: number;
  favourite_showrooms_count: number;
  my_cars_count: number;
}

// Define the state interface
interface PersistState {
  showWarningUpdateVersion: boolean;
  brands: any[];
  cities: any[];
  showrooms: any[];
  carData: CarData;
  cars: any[];
  favouriteCarsList: any[];
  myCarsList: any[];
  token: string | null;
  profile: Profile | {};
  favouriteShowRoomsList: any[];
  notification_list: any[];
  notificationCount: number;
  all_cars_nextPage: number;
  isThare_CarsPages: boolean;
  isThare_showroomsPages: boolean;
  showrooms_nextPage: number;
  all_brands_nextPage: number;
  isThare_brandsPages: boolean;
  isThare_favouriteCarsPages: boolean;
  favouriteCarsList_nextPage: number;
  isThare_favouriteShowRoomsPages: boolean;
  favouriteShowRooms_nextPage: number;
  isThareMyCarsPage: boolean;
  myCars_nextPage: number;
  isThareNotificationPage: boolean;
  notification_nextPage: number;
  showroomNotification: boolean;
  skipThisVersion: string;
}

const defaultCarData: CarData = {
  addTitle: '',
  images: {} as any,
  brand: -1,
  modal: -1,
  year_manufacture: '',
  price: '',
  specification: -1,
  walkway: '',
  used_status: 'used',
  engine: -1,
  fuel_type: -1,
  gearbox: -1,
  details: '',
  full_name: '',
  phone: '',
  city: -1,
  address: '',
};

const initialState: PersistState = {
  showWarningUpdateVersion: false,
  brands: [],
  cities: [],
  showrooms: [],
  carData: { ...defaultCarData },
  cars: [],
  favouriteCarsList: [],
  myCarsList: [],
  token: null,
  profile: {},
  favouriteShowRoomsList: [],
  notification_list: [],
  notificationCount: 0,
  all_cars_nextPage: 1,
  isThare_CarsPages: false,
  isThare_showroomsPages: false,
  showrooms_nextPage: 1,
  all_brands_nextPage: 1,
  isThare_brandsPages: false,
  isThare_favouriteCarsPages: false,
  favouriteCarsList_nextPage: 1,
  isThare_favouriteShowRoomsPages: false,
  favouriteShowRooms_nextPage: 1,
  isThareMyCarsPage: false,
  myCars_nextPage: 1,
  isThareNotificationPage: false,
  notification_nextPage: 1,
  showroomNotification: false,
  skipThisVersion: getAppVersion(),
};

// Helper function to remove cars
function removeCar(
  id: string,
  _cars: any[],
  _favouriteCarsList: any[],
  _myCarsList: any[],
  isSold?: boolean,
) {
  let cars: any[] = [];
  let favouriteCarsList: any[] = [];
  let myCarsList: any[] = [];

  for (let i = 0; i < _cars.length; i++)
    if (_cars[i].id !== parseInt(id, 10)) cars.push(_cars[i]);

  for (let i = 0; i < _favouriteCarsList.length; i++) {
    if (isSold && _favouriteCarsList[i].id === parseInt(id, 10)) {
      let data = _favouriteCarsList[i];
      data.verification_status = 'sold';
      favouriteCarsList.push(data);
    } else if (_favouriteCarsList[i].id !== parseInt(id, 10))
      favouriteCarsList.push(_favouriteCarsList[i]);
  }

  for (let i = 0; i < _myCarsList.length; i++) {
    if (isSold && _myCarsList[i].id === parseInt(id, 10)) {
      let data = _myCarsList[i];
      data.verification_status = 'sold';
      myCarsList.push(data);
    } else if (_myCarsList[i].id !== parseInt(id, 10))
      myCarsList.push(_myCarsList[i]);
  }

  return { cars, favouriteCarsList, myCarsList };
}

const persistSlice = createSlice({
  name: 'persist',
  initialState,
  reducers: {
    setWarningVersion: (
      state,
      action: PayloadAction<{ isShow: boolean; version?: string }>,
    ) => {
      state.showWarningUpdateVersion = action.payload.isShow;
      if (action.payload.version) {
        state.skipThisVersion = action.payload.version;
      }
    },

    setAdvancedFilter: (
      state,
      action: PayloadAction<{ data: any; filterKey: string }>,
    ) => {
      const { data, filterKey } = action.payload;
      if (filterKey === 'carData') {
        state.carData = { ...state.carData, ...data };
      }
    },

    storeCarData: (state, action: PayloadAction<CarData>) => {
      state.carData = action.payload;
    },

    soldCar: (state, action: PayloadAction<{ urlParams: string }>) => {
      const id = action.payload.urlParams.split('/')[0];
      const newLists = removeCar(
        id,
        state.cars,
        state.favouriteCarsList,
        state.myCarsList,
        true,
      );
      state.cars = newLists.cars;
      state.favouriteCarsList = newLists.favouriteCarsList;
      state.myCarsList = newLists.myCarsList;
    },

    removeCarFromLists: (
      state,
      action: PayloadAction<{ urlParams: string }>,
    ) => {
      const id = action.payload.urlParams.split('/')[0];
      const newLists = removeCar(
        id,
        state.cars,
        state.favouriteCarsList,
        state.myCarsList,
      );
      state.cars = newLists.cars;
      state.favouriteCarsList = newLists.favouriteCarsList;
      state.myCarsList = newLists.myCarsList;
      if (
        typeof state.profile === 'object' &&
        'my_cars_count' in state.profile
      ) {
        (state.profile as Profile).my_cars_count = newLists.myCarsList.length;
        (state.profile as Profile).favourite_cars_count =
          newLists.favouriteCarsList.length;
      }
    },

    logout: state => {
      state.token = null;
      state.profile = {};
      state.favouriteCarsList = [];
      state.favouriteShowRoomsList = [];
      state.myCarsList = [];
      state.notificationCount = 0;
    },

    updateProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
    },

    addNewCar: state => {
      const carData = { ...defaultCarData };
      if (typeof state.profile === 'object' && 'first_name' in state.profile) {
        const profile = state.profile as Profile;
        carData.full_name = `${profile.first_name} ${profile.last_name}`;
        carData.phone = profile.phone.replace('+964', '');
        carData.address = profile.address;
      }
      state.carData = carData;
      if (
        typeof state.profile === 'object' &&
        'my_cars_count' in state.profile
      ) {
        (state.profile as Profile).my_cars_count += 1;
      }
    },

    favouriteCar: (state, action: PayloadAction<{ is_favourite: boolean }>) => {
      if (
        typeof state.profile === 'object' &&
        'favourite_cars_count' in state.profile
      ) {
        const profile = state.profile as Profile;
        profile.favourite_cars_count += action.payload.is_favourite ? 1 : -1;
      }
    },

    favouriteShowroom: (
      state,
      action: PayloadAction<{ is_favourite: boolean }>,
    ) => {
      if (
        typeof state.profile === 'object' &&
        'favourite_showrooms_count' in state.profile
      ) {
        const profile = state.profile as Profile;
        profile.favourite_showrooms_count += action.payload.is_favourite
          ? 1
          : -1;
      }
    },

    resetCarData: state => {
      state.carData = { ...defaultCarData };
    },

    resetCars: state => {
      state.cars = [];
      state.all_cars_nextPage = 1;
      state.isThare_CarsPages = false;
    },

    resetShowrooms: state => {
      state.showrooms = [];
      state.showrooms_nextPage = 1;
      state.isThare_showroomsPages = false;
    },

    // Async action results
    verifyPhoneSuccess: (
      state,
      action: PayloadAction<{ token: string; profile: Profile }>,
    ) => {
      const { token, profile } = action.payload;
      state.token = token;
      state.profile = profile;

      const carData = { ...state.carData };
      carData.full_name = `${profile.first_name} ${profile.last_name}`;
      carData.phone = profile.phone ? profile.phone.replace('+964', '') : '';
      carData.address = profile.address;
      state.carData = carData;
    },

    signInSuccess: (
      state,
      action: PayloadAction<{
        token: string;
        profile: Profile;
        phone_verified: boolean;
      }>,
    ) => {
      const { token, profile, phone_verified } = action.payload;
      if (phone_verified) {
        state.token = token;
        state.profile = profile;

        const carData = { ...state.carData };
        carData.full_name = `${profile.first_name} ${profile.last_name}`;
        carData.phone = profile.phone ? profile.phone.replace('+964', '') : '';
        carData.address = profile.address;
        state.carData = carData;
      }
    },

    socialLoginSuccess: (
      state,
      action: PayloadAction<{ token: string; profile: Profile }>,
    ) => {
      const { token, profile } = action.payload;
      state.token = token;
      state.profile = profile;

      const carData = { ...state.carData };
      carData.full_name = `${profile.first_name} ${profile.last_name}`;
      carData.phone = profile.phone ? profile.phone.replace('+964', '') : '';
      carData.address = profile.address;
      state.carData = carData;
    },

    getCitiesSuccess: (state, action: PayloadAction<{ results: any[] }>) => {
      state.cities = action.payload.results;
    },

    getBrandsSuccess: (state, action: PayloadAction<{ results: any[] }>) => {
      state.brands = action.payload.results;
    },

    getAllCarsSuccess: (
      state,
      action: PayloadAction<{ results: any[]; next: string | null }>,
    ) => {
      const page = getNexPage(
        action.payload.next || '',
        state.all_cars_nextPage,
      );
      state.cars = [
        ...(page === 2 ? [] : state.cars),
        ...action.payload.results,
      ];
      state.all_cars_nextPage = page;
      state.isThare_CarsPages = !!action.payload.next;
    },

    getShowroomsSuccess: (
      state,
      action: PayloadAction<{ results: any[]; next: string | null }>,
    ) => {
      const page = getNexPage(
        action.payload.next || '',
        state.showrooms_nextPage,
      );
      state.showrooms = [
        ...(page === 1 ? [] : state.showrooms),
        ...action.payload.results,
      ];
      state.showrooms_nextPage = page;
      state.isThare_showroomsPages = !!action.payload.next;
    },

    getFavouriteCarsSuccess: (
      state,
      action: PayloadAction<{ results: any[]; next: string | null }>,
    ) => {
      const page = getNexPage(
        action.payload.next || '',
        state.favouriteCarsList_nextPage,
      );
      state.favouriteCarsList = [
        ...(page === 1 ? [] : state.favouriteCarsList),
        ...action.payload.results,
      ];
      state.favouriteCarsList_nextPage = page;
      state.isThare_favouriteCarsPages = !!action.payload.next;
    },

    getFavouriteShowroomsSuccess: (
      state,
      action: PayloadAction<{ results: any[]; next: string | null }>,
    ) => {
      const page = getNexPage(
        action.payload.next || '',
        state.favouriteShowRooms_nextPage,
      );
      state.favouriteShowRoomsList = [
        ...(page === 1 ? [] : state.favouriteShowRoomsList),
        ...action.payload.results,
      ];
      state.favouriteShowRooms_nextPage = page;
      state.isThare_favouriteShowRoomsPages = !!action.payload.next;
    },

    getMyCarsSuccess: (
      state,
      action: PayloadAction<{ results: any[]; next: string | null }>,
    ) => {
      const page = getNexPage(action.payload.next || '', state.myCars_nextPage);
      state.myCarsList = [
        ...(page === 1 ? [] : state.myCarsList),
        ...action.payload.results,
      ];
      state.myCars_nextPage = page;
      state.isThareMyCarsPage = !!action.payload.next;
    },

    getNotificationListSuccess: (
      state,
      action: PayloadAction<{ results: any[]; next: string | null }>,
    ) => {
      const page = getNexPage(
        action.payload.next || '',
        state.notification_nextPage,
      );
      state.notificationCount = 0;
      state.notification_nextPage = page;
      state.isThareNotificationPage = !!action.payload.next;
      state.notification_list = [
        ...(page === 1 ? [] : state.notification_list),
        ...action.payload.results,
      ];
    },

    getNotViewedNotificationSuccess: (
      state,
      action: PayloadAction<{ count: number }>,
    ) => {
      state.notificationCount = action.payload.count;
    },
  },
});

export const {
  setWarningVersion,
  setAdvancedFilter,
  storeCarData,
  soldCar,
  removeCarFromLists,
  logout,
  updateProfile,
  addNewCar,
  favouriteCar,
  favouriteShowroom,
  resetCarData,
  resetCars,
  resetShowrooms,
  verifyPhoneSuccess,
  signInSuccess,
  socialLoginSuccess,
  getCitiesSuccess,
  getBrandsSuccess,
  getAllCarsSuccess,
  getShowroomsSuccess,
  getFavouriteCarsSuccess,
  getFavouriteShowroomsSuccess,
  getMyCarsSuccess,
  getNotificationListSuccess,
  getNotViewedNotificationSuccess,
} = persistSlice.actions;

export type { PersistState, CarData, Profile };
export default persistSlice.reducer;
