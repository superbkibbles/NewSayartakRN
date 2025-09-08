/* Login Reducer
 * handles login states in the app
 */
import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import { getAppVersion } from '../config/appConfig';
import { getNexPage } from '../utils/datesUtils';

const defaultData = {
  showWarningUpdateVersion: false,
  brands: [] as any[],
  cars: [] as any[],
  cities: [] as any[],
  showrooms: [] as any[],
  carData: {
    addTitle: '',
    images: {} as any,
    brand: -1,
    modal: -1,
    year_manufacture: '',
    price: '',
    // page 2
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
  },
  token: null,
  profile: {} as any,
  favouriteCarsList: [] as any[],
  favouriteShowRoomsList: [] as any[],
  myCarsList: [] as any[],
  notification_list: [] as any[],
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

// city: -1,
// engine: -1,

type PresistState = typeof defaultData & {
  cars: any[];
};

const initialState: PresistState = {
  showWarningUpdateVersion: false,
  brands: [] as any[],
  cities: [] as any[],
  showrooms: [] as any[],
  carData: {
    addTitle: '',
    images: {} as any,
    brand: -1,
    modal: -1,
    year_manufacture: '',
    price: '',
    // page 2
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
  },

  cars: [] as any[],
  favouriteCarsList: [] as any[],
  myCarsList: [] as any[],

  token: null,
  profile: {} as any,
  favouriteShowRoomsList: [] as any[],
  notification_list: [] as any[],
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
type AnyAction = { type: string; [key: string]: any };

export const presistReducer = createReducer<PresistState, AnyAction>(
  initialState,
  {
    //Save data
    [types.SET_WARNING_VERSION](state: PresistState, action: AnyAction) {
      return {
        ...state,
        showWarningUpdateVersion: action.isShow,
        skipThisVersion: action.version || state.skipThisVersion,
      };
    },

    //Save data
    [types.VERIFY_PHONE_NUMBER](state: PresistState, action: AnyAction) {
      let phone = action.response.profile.phone;
      let carData = { ...state.carData };
      carData.full_name =
        action.response.profile.first_name +
        ' ' +
        action.response.profile.last_name;
      carData.phone = phone ? phone.replace('+964', '') : '';
      // carData.city = action.response.profile.city
      carData.address = action.response.profile.address;
      return {
        ...state,
        token: action.response.token,
        profile: action.response.profile,
        carData: carData,
      };
    },

    //advanced search
    [types.SET_ADVANCED_FILTER](state: PresistState, action: AnyAction) {
      return {
        ...state,
        [action.filterKey as keyof PresistState]: {
          ...(state as any)[action.filterKey],
          ...action.data,
        },
      };
    },
    //favourites car
    [types.UPDATE_PROFILE](state: PresistState, action: AnyAction) {
      return { ...state, profile: action.response };
    },
    //get notification list car
    [types.GET_NOTIFICATION_LIST](state: PresistState, action: AnyAction) {
      let page = getNexPage(action.response.next, state.notification_nextPage);
      return {
        ...state,
        notificationCount: 0,
        notification_nextPage: page,
        isThareNotificationPage: action.response.next ? true : false,
        notification_list: [
          ...(page === 1 ? [] : state.notification_list),
          ...action.response.results,
        ],
      };
    },
    //get notification list car
    [types.GET_NOT_VIEWD_NOTIFICATION](state: PresistState, action: AnyAction) {
      return { ...state, notificationCount: action.response.count };
    },

    //favourites car
    [types.FAVOURITE_CARS](state: PresistState, action: AnyAction) {
      return {
        ...state,
        profile: {
          ...state.profile,
          favourite_cars_count: action.response.is_favourite
            ? state.profile.favourite_cars_count + 1
            : state.profile.favourite_cars_count - 1,
        },
      };
    },

    // sold cars
    [types.SOLD_CAR](state: PresistState, action: AnyAction) {
      let id = action.payload.urlParams.split('/')[0];
      let newLists = removeCar(
        id,
        state.cars,
        state.favouriteCarsList,
        state.myCarsList,
        true,
      );
      return {
        ...state,
        ...newLists,
      };
    },

    // remove cars
    [types.REMOVE_CAR](state: PresistState, action: AnyAction) {
      let id = action.payload.urlParams.split('/')[0];
      let newLists = removeCar(
        id,
        state.cars,
        state.favouriteCarsList,
        state.myCarsList,
      );
      return {
        ...state,
        ...newLists,
        profile: {
          ...state.profile,
          my_cars_count: newLists.myCarsList.length,
          favourite_cars_count: newLists.favouriteCarsList.length,
        },
      };
    },

    //favourites car
    [types.ADD_NEW_CAR](state: PresistState, _action: AnyAction) {
      let carData = { ...defaultData.carData };
      carData.full_name =
        state.profile.first_name + ' ' + state.profile.last_name;
      carData.phone = state.profile.phone.replace('+964', '');
      // carData.city = state.profile.city
      carData.address = state.profile.address;
      return {
        ...state,
        carData: carData,
        profile: {
          ...state.profile,
          my_cars_count: state.profile.my_cars_count + 1,
        },
      };
    },
    // favourites showrooms
    [types.FAVOURITE_SHOWROOM](state: PresistState, action: AnyAction) {
      return {
        ...state,
        profile: {
          ...state.profile,
          favourite_showrooms_count: action.response.is_favourite
            ? state.profile.favourite_showrooms_count + 1
            : state.profile.favourite_showrooms_count - 1,
        },
      };
    },

    // car data
    [types.MY_CAR_ADS](state: PresistState, action: AnyAction) {
      let page = getNexPage(action.response.next, state.myCars_nextPage);
      return {
        ...state,
        myCarsList: [
          ...(page === 1 ? [] : state.myCarsList),
          ...action.response.results,
        ],
        myCars_nextPage: page,
        isThareMyCarsPage: action.response.next ? true : false,
      };
    },
    // car data
    [types.FAVOURITE_SHOWROOMS_LIST](state: PresistState, action: AnyAction) {
      let page = getNexPage(
        action.response.next,
        state.favouriteShowRooms_nextPage,
      );
      return {
        ...state,
        favouriteShowRoomsList: [
          ...(page === 1 ? [] : state.favouriteShowRoomsList),
          ...action.response.results,
        ],
        favouriteShowRooms_nextPage: page,
        isThare_favouriteShowRoomsPages: action.response.next ? true : false,
      };
    },
    // set cities
    [types.FAVOURITE_CARS_LIST](state: PresistState, action: AnyAction) {
      let page = getNexPage(
        action.response.next,
        state.favouriteCarsList_nextPage,
      );
      return {
        ...state,
        favouriteCarsList: [
          ...(page === 1 ? [] : state.favouriteCarsList),
          ...action.response.results,
        ],
        favouriteCarsList_nextPage: page,
        isThare_favouriteCarsPages: action.response.next ? true : false,
      };
    },

    // sign in
    [types.LOGOUT_USER](state: PresistState, _action: AnyAction) {
      return {
        ...state,
        token: null,
        profile: {},
        favouriteCarsList: [],
        favouriteShowRoomsList: [],
        myCarsList: [],
        notificationCount: 0,
      };
    },
    // sign in
    [types.LOGOUT](state: PresistState, _action: AnyAction) {
      return {
        ...state,
        token: null,
        profile: {},
        favouriteCarsList: [],
        favouriteShowRoomsList: [],
        myCarsList: [],
        notificationCount: 0,
      };
    },

    // sign in
    [types.SOCAIL_LOGIN](state: PresistState, action: AnyAction) {
      let phone = action.response.profile.phone;
      let carData = { ...state.carData };
      carData.full_name =
        action.response.profile.first_name +
        ' ' +
        action.response.profile.last_name;
      carData.phone = phone ? phone.replace('+964', '') : '';
      // carData.city = action.response.profile.city
      carData.address = action.response.profile.address;

      return {
        ...state,
        token: action.response.token,
        profile: action.response.profile,
        carData: carData,
      };
    },

    // sign in
    [types.SIGN_IN](state: PresistState, action: AnyAction) {
      let phone = action.response.profile.phone;
      let carData = { ...state.carData };
      if (action.response.phone_verified) {
        carData.full_name =
          action.response.profile.first_name +
          ' ' +
          action.response.profile.last_name;
        carData.phone = phone ? phone.replace('+964', '') : '';
        // carData.city = action.response.profile.city
        carData.address = action.response.profile.address;
      }

      if (action.response.phone_verified)
        return {
          ...state,
          token: action.response.token,
          profile: action.response.profile,
          carData: carData,
        };
      else return { ...state };
    },

    // car data
    [types.STORE_ADD_CAR_DATA](state: PresistState, action: AnyAction) {
      return { ...state, carData: action.data };
    },
    // set cities
    [types.GET_CITIES](state: PresistState, action: AnyAction) {
      return { ...state, cities: action.response.results };
    },

    // get all brands
    [types.GET_BRANDS](state: PresistState, action: AnyAction) {
      return { ...state, brands: action.response.results };
    },

    // all cars for home page
    [types.GET_ALL_CARS](state: PresistState, action: AnyAction) {
      const page = getNexPage(action.response.next, state.all_cars_nextPage);
      return {
        ...state,
        cars: [...(page === 2 ? [] : state.cars), ...action.response.results],
        all_cars_nextPage: page,
        isThare_CarsPages: action.response.next ? true : false,
      };
    },
    // all showrooms list
    [types.GET_SHOW_ROOMS](state: PresistState, action: AnyAction) {
      let page = getNexPage(action.response.next, state.showrooms_nextPage);
      return {
        ...state,
        showrooms: [
          ...(page === 1 ? [] : state.showrooms),
          ...action.response.results,
        ],
        showrooms_nextPage: page,
        isThare_showroomsPages: action.response.next ? true : false,
      };
    },

    //reset data
    [types.REQUEST_ACTION](state: PresistState, action: AnyAction) {
      if (action.payload.reset)
        return {
          ...state,
          [action.payload.reset as keyof PresistState]: (defaultData as any)[
            action.payload.reset
          ],
        };
      else return { ...state };
    },
    [types.REQUEST_ACTION_LATEST](state: PresistState, action: AnyAction) {
      if (action.payload.reset)
        return {
          ...state,
          [action.payload.reset as keyof PresistState]: (defaultData as any)[
            action.payload.reset
          ],
        };
      else return { ...state };
    },
  },
);
