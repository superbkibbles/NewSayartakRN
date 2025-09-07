/* Login Reducer
 * handles login states in the app
 */
import createReducer from 'app/lib/createReducer';
import * as types from '../actions/types';
import { getAppVersion } from '../config/appConfig';
import { getNexPage } from '../utils/datesUtils';

const defaultData = {
    showWarningUpdateVersion: false,
    brands: [],
    cars: [],
    cities: [],
    showrooms: [],
    carData: {
        addTitle: "",
        images: {},
        brand: -1,
        modal: -1,
        year_manufacture: "",
        price: "",
        // page 2
        specification: -1,
        walkway: "",
        used_status: "used",
        engine: -1,
        fuel_type: -1,
        gearbox: -1,
        details: "",

        full_name: "",
        phone: "",
        city: -1,
        address: "",
    },
    token: null,
    profile: {},
    favouriteCarsList: [],
    favouriteShowRoomsList: [],
    myCarsList: [],
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
    skipThisVersion: getAppVersion()

};

// city: -1,
// engine: -1,


const initialState = {

    showWarningUpdateVersion: false,
    brands: [],
    cities: [],
    showrooms: [],
    carData: {
        addTitle: "",
        images: {},
        brand: -1,
        modal: -1,
        year_manufacture: "",
        price: "",
        // page 2
        specification: -1,
        walkway: "",
        used_status: "used",
        engine: -1,
        fuel_type: -1,
        gearbox: -1,
        details: "",

        full_name: "",
        phone: "",
        city: -1,
        address: "",
    },


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
    skipThisVersion: getAppVersion()

};
function removeCar(id, _cars, _favouriteCarsList, _myCarsList, isSold) {
    let cars = []
    let favouriteCarsList = []
    let myCarsList = []

    for (let i = 0; i < _cars.length; i++)
        if (_cars[i].id !== parseInt(id)) cars.push(_cars[i])


    for (let i = 0; i < _favouriteCarsList.length; i++) {
        if (isSold && _favouriteCarsList[i].id === parseInt(id)) {
            let data = _favouriteCarsList[i]
            data.verification_status = "sold"
            favouriteCarsList.push(data)
        }
        else
            if (_favouriteCarsList[i].id !== parseInt(id)) favouriteCarsList.push(_favouriteCarsList[i])
    }


    for (let i = 0; i < _myCarsList.length; i++) {
        if (isSold && _myCarsList[i].id === parseInt(id)) {
            let data = _myCarsList[i]
            data.verification_status = "sold"
            myCarsList.push(data)
        }
        else
            if (_myCarsList[i].id !== parseInt(id)) myCarsList.push(_myCarsList[i])
    }

    return { cars, favouriteCarsList, myCarsList }
}
export const presistReducer = createReducer(initialState, {


    //Save data
    [types.SET_WARNING_VERSION](state, action) {
        return {
            ...state, showWarningUpdateVersion: action.isShow,
            skipThisVersion: action.version || state.skipThisVersion
        };

    },

    //Save data
    [types.VERIFY_PHONE_NUMBER](state, action) {
        let phone=action.response.profile.phone
        let carData = { ...state.carData }
        carData.full_name = action.response.profile.first_name + " " + action.response.profile.last_name
        carData.phone =phone? phone.replace("+964", ""):""
        // carData.city = action.response.profile.city
        carData.address = action.response.profile.address
        return {
            ...state, token: action.response.token,
            profile: action.response.profile,
            carData: carData
        };

    },

    //advanced search 
    [types.SET_ADVANCED_FILTER](state, action) {
        return {
            ...state, [action.filterKey]: { ...state[action.filterKey], ...action.data }
        }
    },
    //favourites car 
    [types.UPDATE_PROFILE](state, action) {
        return { ...state, profile: action.response };
    },
    //get notification list car
    [types.GET_NOTIFICATION_LIST](state, action) {
        let page = getNexPage(action.response.next, state.notification_nextPage);
        return {
            ...state,
            notificationCount: 0,
            notification_nextPage: page,
            isThareNotificationPage: action.response.next ? true : false,
            notification_list: [...(page === 1 ? [] : state.notification_list), ...action.response.results]

        };
    },
    //get notification list car 
    [types.GET_NOT_VIEWD_NOTIFICATION](state, action) {
        return { ...state, notificationCount: action.response.count };
    },

    //favourites car 
    [types.FAVOURITE_CARS](state, action) {

        return { ...state, profile: { ...state.profile, favourite_cars_count: action.response.is_favourite ? state.profile.favourite_cars_count + 1 : state.profile.favourite_cars_count - 1 } };
    },




    // sold cars
    [types.SOLD_CAR](state, action) {
        let id = action.payload.urlParams.split("/")[0]
        let newLists = removeCar(id, state.cars, state.favouriteCarsList, state.myCarsList, true)
        return {
            ...state,
            ...newLists
        };
    },


    // remove cars
    [types.REMOVE_CAR](state, action) {
        let id = action.payload.urlParams.split("/")[0]
        let newLists = removeCar(id, state.cars, state.favouriteCarsList, state.myCarsList)
        return {
            ...state,
            ...newLists,
            profile: {
                ...state.profile,
                my_cars_count: newLists.myCarsList.length,
                favourite_cars_count: newLists.favouriteCarsList.length
            }
        };
    },



    //favourites car 
    [types.ADD_NEW_CAR](state, action) {
        let carData = { ...defaultData.carData }
        carData.full_name = state.profile.first_name + " " + state.profile.last_name
        carData.phone = state.profile.phone.replace("+964", "")
        // carData.city = state.profile.city
        carData.address = state.profile.address
        return {
            ...state,
            carData: carData,
            profile: {
                ...state.profile,
                my_cars_count: state.profile.my_cars_count + 1
            }
        };
    },
    // favourites showrooms
    [types.FAVOURITE_SHOWROOM](state, action) {
        return { ...state, profile: { ...state.profile, favourite_showrooms_count: action.response.is_favourite ? state.profile.favourite_showrooms_count + 1 : state.profile.favourite_showrooms_count - 1 } };
    },

    // car data
    [types.MY_CAR_ADS](state, action) {
        let page = getNexPage(action.response.next, state.myCars_nextPage);
        return {
            ...state,
            myCarsList: [
                ...(page == 1 ? [] : state.myCarsList),
                ...action.response.results,
            ],
            myCars_nextPage: page,
            isThareMyCarsPage: action.response.next ? true : false,
        };
    },
    // car data
    [types.FAVOURITE_SHOWROOMS_LIST](state, action) {
        let page = getNexPage(action.response.next, state.favouriteShowRooms_nextPage)
        return { ...state, favouriteShowRoomsList: [...page == 1 ? [] : state.favouriteShowRoomsList, ...action.response.results], favouriteShowRooms_nextPage: page, isThare_favouriteShowRoomsPages: action.response.next ? true : false };
    },
    // set cities
    [types.FAVOURITE_CARS_LIST](state, action) {
        let page = getNexPage(action.response.next, state.favouriteCarsList_nextPage)
        return { ...state, favouriteCarsList: [...page == 1 ? [] : state.favouriteCarsList, ...action.response.results], favouriteCarsList_nextPage: page, isThare_favouriteCarsPages: action.response.next ? true : false };
    },

    // sign in
    [types.LOGOUT_USER](state, action) {
        return {
            ...state, token: null, profile: {},
            favouriteCarsList: [],
            favouriteShowRoomsList: [],
            myCarsList: [],
            notificationCount: 0
        };
    },
    // sign in
    [types.LOGOUT](state, action) {
        return {
            ...state, token: null, profile: {},
            favouriteCarsList: [],
            favouriteShowRoomsList: [],
            myCarsList: [],
            notificationCount: 0
        };
    },

    // sign in
    [types.SOCAIL_LOGIN](state, action) {
        let phone=action.response.profile.phone
        let carData = { ...state.carData };
        carData.full_name =
            action.response.profile.first_name +
            " " +
            action.response.profile.last_name;
        carData.phone =phone? phone.replace("+964", ""):"";
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
    [types.SIGN_IN](state, action) {
        let phone=action.response.profile.phone
        let carData = { ...state.carData };
        if (action.response.phone_verified) {
            carData.full_name =
                action.response.profile.first_name +
                " " +
                action.response.profile.last_name;
            carData.phone =phone? phone.replace("+964", ""):"";
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
    [types.STORE_ADD_CAR_DATA](state, action) {
        return { ...state, carData: action.data };
    },
    // set cities
    [types.GET_CITIES](state, action) {
        return { ...state, cities: action.response.results };
    },

    // get all brands
    [types.GET_BRANDS](state, action) {
        return { ...state, brands: action.response.results };
    },

    // all cars for home page
    [types.GET_ALL_CARS](state, action) {  
        const page=getNexPage(action.response.next, state.all_cars_nextPage)
        return { ...state, cars: [...page==2?[]:state.cars, ...action.response.results], all_cars_nextPage: page, isThare_CarsPages: action.response.next ? true : false };
    },
    // all showrooms list
    [types.GET_SHOW_ROOMS](state, action) {
        let page = getNexPage(action.response.next, state.showrooms_nextPage)
        return { ...state, showrooms: [...page == 1 ? [] : state.showrooms, ...action.response.results], showrooms_nextPage: page, isThare_showroomsPages: action.response.next ? true : false };
    },

    //reset data
    [types.REQUEST_ACTION](state, action) {
        if (action.payload.reset)
            return { ...state, [action.payload.reset]: defaultData[action.payload.reset] }
        else
            return { ...state }
    },
    [types.REQUEST_ACTION_LATEST](state, action) {
        if (action.payload.reset)
            return { ...state, [action.payload.reset]: defaultData[action.payload.reset] }
        else
            return { ...state }

    }

});


