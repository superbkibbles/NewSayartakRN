import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getNexPage } from '../../utils/datesUtils';

// Define interfaces
interface Filter {
  used_status: string;
  brand: number;
  modal: number;
  modal_from: string;
  modal_to: string;
  from_price: string;
  to_price: string;
  city: number;
  walkway_from: string;
  walkway_to: string;
  engine: number;
  fuel_type: number;
  gearbox: number;
  showroom: string;
  specification: number;
}

interface EditCarData {
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

interface UpdateProfile {
  city: number;
}

interface GeneralState {
  editCarData: EditCarData;
  updateProfile: UpdateProfile;
  showroom_cars: any[];
  brandModals: any[];
  resultFilterCars: any[];
  filter: Filter;
  similr_cars: any[];
  verify_phone_token: string | null;
  isThareResultFilterCarsPage: boolean;
  resultFilterCars_nextPage: number;
  showroomsCars_nextPage: number;
  isThare_showroomsCarsPages: boolean;
}

const defaultEditCarData: EditCarData = {
  addTitle: '',
  images: {},
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

const defaultFilter: Filter = {
  used_status: 'all',
  brand: -1,
  modal: -1,
  modal_from: '',
  modal_to: '',
  from_price: '',
  to_price: '',
  city: -1,
  walkway_from: '',
  walkway_to: '',
  engine: -1,
  fuel_type: -1,
  gearbox: -1,
  showroom: '',
  specification: -1,
};

const initialState: GeneralState = {
  editCarData: { ...defaultEditCarData },
  updateProfile: {
    city: -1,
  },
  showroom_cars: [],
  brandModals: [],
  resultFilterCars: [],
  filter: { ...defaultFilter },
  similr_cars: [],
  verify_phone_token: null,
  isThareResultFilterCarsPage: false,
  resultFilterCars_nextPage: 1,
  showroomsCars_nextPage: 1,
  isThare_showroomsCarsPages: false,
};

// Helper function to remove cars
function removeCar(
  id: string,
  _similr_cars: any[],
  _resultFilterCars: any[],
  isSold?: boolean,
) {
  let similr_cars = [];
  let resultFilterCars = [];

  for (let i = 0; i < _similr_cars.length; i++)
    if (_similr_cars[i].id !== parseInt(id)) similr_cars.push(_similr_cars[i]);

  for (let i = 0; i < _resultFilterCars.length; i++) {
    if (isSold && _resultFilterCars[i].id === parseInt(id)) {
      let data = _resultFilterCars[i];
      data.verification_status = 'sold';
      resultFilterCars.push(data);
    } else if (_resultFilterCars[i].id !== parseInt(id))
      resultFilterCars.push(_resultFilterCars[i]);
  }

  return { similr_cars, resultFilterCars };
}

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setAdvancedFilter: (
      state,
      action: PayloadAction<{ data: any; filterKey: string }>,
    ) => {
      const { data, filterKey } = action.payload;
      if (filterKey === 'filter') {
        state.filter = { ...state.filter, ...data };
      } else if (filterKey === 'editCarData') {
        state.editCarData = { ...state.editCarData, ...data };
      } else if (filterKey === 'updateProfile') {
        state.updateProfile = { ...state.updateProfile, ...data };
      }
    },

    soldCar: (state, action: PayloadAction<{ urlParams: string }>) => {
      const id = action.payload.urlParams.split('/')[0];
      const newLists = removeCar(
        id,
        state.similr_cars,
        state.resultFilterCars,
        true,
      );
      state.similr_cars = newLists.similr_cars;
      state.resultFilterCars = newLists.resultFilterCars;
    },

    removeCarFromLists: (
      state,
      action: PayloadAction<{ urlParams: string }>,
    ) => {
      const id = action.payload.urlParams.split('/')[0];
      const newLists = removeCar(id, state.similr_cars, state.resultFilterCars);
      state.similr_cars = newLists.similr_cars;
      state.resultFilterCars = newLists.resultFilterCars;
    },

    resetEditCarData: state => {
      state.editCarData = { ...defaultEditCarData };
    },

    resetFilter: state => {
      state.filter = { ...defaultFilter };
    },

    resetResultFilterCars: state => {
      state.resultFilterCars = [];
      state.resultFilterCars_nextPage = 1;
      state.isThareResultFilterCarsPage = false;
    },

    resetShowroomCars: state => {
      state.showroom_cars = [];
      state.showroomsCars_nextPage = 1;
      state.isThare_showroomsCarsPages = false;
    },

    // Async action results
    forgotPasswordSendOtpSuccess: (
      state,
      action: PayloadAction<{ token: string }>,
    ) => {
      state.verify_phone_token = action.payload.token;
    },

    getShowroomCarsSuccess: (
      state,
      action: PayloadAction<{ results: any[]; next: string | null }>,
    ) => {
      const page = getNexPage(
        action.payload.next || '',
        state.showroomsCars_nextPage,
      );
      state.showroom_cars = [
        ...(page === 1 ? [] : state.showroom_cars),
        ...action.payload.results,
      ];
      state.showroomsCars_nextPage = page;
      state.isThare_showroomsCarsPages = !!action.payload.next;
    },

    getSimilarCarsSuccess: (
      state,
      action: PayloadAction<{ results: any[] }>,
    ) => {
      state.similr_cars = action.payload.results;
    },

    getBrandModalsSuccess: (
      state,
      action: PayloadAction<{ results: any[] }>,
    ) => {
      console.log('brandModalsbrandModals', action.payload.results);
      state.brandModals = action.payload.results;
    },

    getAllFilterCarsSuccess: (
      state,
      action: PayloadAction<{ results: any[]; next: string | null }>,
    ) => {
      console.log('getAllFilterCarsSuccess', action.payload.results);
      state.resultFilterCars = [
        ...state.resultFilterCars,
        ...action.payload.results,
      ];
      state.resultFilterCars_nextPage = getNexPage(
        action.payload.next || '',
        state.resultFilterCars_nextPage,
      );
      state.isThareResultFilterCarsPage = !!action.payload.next;
    },
  },
});

export const {
  setAdvancedFilter,
  soldCar,
  removeCarFromLists,
  resetEditCarData,
  resetFilter,
  resetResultFilterCars,
  resetShowroomCars,
  forgotPasswordSendOtpSuccess,
  getShowroomCarsSuccess,
  getSimilarCarsSuccess,
  getBrandModalsSuccess,
  getAllFilterCarsSuccess,
} = generalSlice.actions;

export type { GeneralState, Filter, EditCarData, UpdateProfile };
export default generalSlice.reducer;
