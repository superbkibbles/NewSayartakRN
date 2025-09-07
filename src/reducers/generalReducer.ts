/**
 * Loading reducer made seperate for easy blacklisting
 * Avoid data persist
 */
import createReducer from 'app/lib/createReducer';
import * as types from '../actions/types';
import { getNexPage } from '../utils/datesUtils';

function removeCar(id, _similr_cars, _resultFilterCars, isSold) {
    let similr_cars = []
    let resultFilterCars = []

    for (let i = 0; i < _similr_cars.length; i++)
        if (_similr_cars[i].id !== parseInt(id)) similr_cars.push(_similr_cars[i])

    for (let i = 0; i < _resultFilterCars.length; i++) {
        if (isSold&&_resultFilterCars[i].id === parseInt(id)) {
            let data = _resultFilterCars[i]
            data.verification_status = "sold"
            resultFilterCars.push(data)
        }
        else
            if (_resultFilterCars[i].id !== parseInt(id)) resultFilterCars.push(_resultFilterCars[i])
    }

    return { similr_cars, resultFilterCars }
}


const defaultData = {
    updateProfile: {
        city: -1
    },
    showroom_cars: [],
    brandModals: [],
    resultFilterCars: [],
    filter: {
        used_status: "all",
        brand: -1,
        modal: -1,
        modal_from: "",
        modal_to: "",
        from_price: "",
        to_price: "",
        city: -1,
        walkway_from: "",
        walkway_to: "",
        engine: -1,
        fuel_type: -1,
        gearbox: -1,
        showroom: "",
        specification: -1
    },
    similr_cars: [],





    editCarData: {
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
        address: ""

    },

};


const initialState = {
    editCarData: {
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
        address: ""

    },

    updateProfile: {
        city: -1
    },
    showroom_cars: [],
    brandModals: [],
    resultFilterCars: [],

    filter: {
        used_status: "all",
        brand: -1,
        modal: -1,
        modal_from: "",
        modal_to: "",
        from_price: "",
        to_price: "",
        city: -1,
        walkway_from: "",
        walkway_to: "",
        engine: -1,
        fuel_type: -1,
        gearbox: -1,
        showroom: "",
        specification: -1
    },
    similr_cars: [],
    verify_phone_token: null,
    isThareResultFilterCarsPage: false,
    resultFilterCars_nextPage: 1,

    showroomsCars_nextPage:1,
    isThare_showroomsCarsPages:false,


};

export const generalReducer = createReducer(initialState, {

    // sold cars
    [types.SOLD_CAR](state, action) {
        let id = action.payload.urlParams.split("/")[0]
        let newLists = removeCar(id, state.similr_cars, state.resultFilterCars, true)
        return {
            ...state,
            ...newLists
        };
    },

    // remove cars
    [types.REMOVE_CAR](state, action) {
        let id = action.payload.urlParams.split("/")[0]
        let newLists = removeCar(id, state.similr_cars, state.resultFilterCars)
        return {
            ...state,
            ...newLists
        };
    },


    //Save data
    [types.FORGOT_PASSWORD_SEND_OTP](state, action) {
        return {
            ...state, verify_phone_token: action.response.token
        }
    },
    
    // return { ...state, showrooms: [...page == 1 ? [] : state.showrooms, ...action.response.results], showrooms_nextPage: page, isThare_showroomsPages: action.response.next ? true : false };
    //Save data
    [types.GET_SHOW_ROOM_CARS](state, action) {
        let page = getNexPage(action.response.next, state.showrooms_nextPage)
        return {
            ...state, showroom_cars:[...page == 1 ? [] : state.showroom_cars, ...action.response.results]  ,
            showroomsCars_nextPage: page, isThare_showroomsCarsPages: action.response.next ? true : false 
        }
    },
    //Save data
    [types.SIMILAR_CARS](state, action) {
        return {
            ...state, similr_cars: action.response.results
        }
    },
    //get Brand Modals List
    [types.GET_BRAND_MODALS](state, action) {
        console.log("brandModalsbrandModals", action.response.results)
        return {
            ...state, brandModals: action.response.results
        }
    },

    [types.GET_ALL_FILTER_CARS](state, action) {
        console.log("brandModalsbrandModals", action.response.results)
        return {
            ...state, resultFilterCars: [...state.resultFilterCars, ...action.response.results], resultFilterCars_nextPage: getNexPage(action.response.next, state.resultFilterCars_nextPage), isThareResultFilterCarsPage: action.response.next ? true : false
        }
    },
    //advanced search 
    [types.SET_ADVANCED_FILTER](state, action) {
        return {
            ...state, [action.filterKey]: { ...state[action.filterKey], ...action.data }
        }
    },


    //reset data
    [types.REQUEST_ACTION](state, action) {
        if (action.payload.reset)
            return { ...state, [action.payload.reset]: defaultData[action.payload.reset] }
        else
            return { ...state }


    }

});
