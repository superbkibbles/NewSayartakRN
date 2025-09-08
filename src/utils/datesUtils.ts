import ImageMarker, { ImageFormat } from 'react-native-image-marker';
import images from '../config/images';
import { Platform } from 'react-native';
export const markImage = async (uri: any) => {
  let image = await ImageMarker.markImage({
    src: { uri: uri },
    markerSrc: images.logoWithText,
    position: 'bottomRight', // topLeft, topCenter,topRight, bottomLeft, bottomCenter , bottomRight, center
    scale: 1,
    markerScale: 0.5,
    quality: 1,

    saveFormat: ImageFormat.png,
    maxSize: 1024,
  });

  return Platform.OS === 'android' ? 'file://' + image : image;
};

export const getNexPage = (url: string, lastPage: any) => {
  return url ? url.split('page=')[1].split('&')[0] : lastPage;
};
export const validateEmail = (email: string) => {
  var RegularExpression =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return RegularExpression.test(email);
};

var persianNumbers = [
    /0/g,
    /1/g,
    /2/g,
    /3/g,
    /4/g,
    /5/g,
    /6/g,
    /7/g,
    /8/g,
    /9/g,
  ],
  arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];

export const fixNumbers = function (str: {
  replace: (
    arg0: RegExp,
    arg1: number,
  ) => {
    (): any;
    new (): any;
    replace: { (arg0: RegExp, arg1: number): any; new (): any };
  };
}) {
  if (typeof str === 'string') {
    for (var i = 0; i < 10; i++) {
      str = str.replace(arabicNumbers[i], i).replace(persianNumbers[i], i);
    }
  }
  return str;
};

export function priceFormatter(price: any) {
  // var formatter = Intl.NumberFormat()
  return price;
}

export const getParamsAndValidation = (params: {
  filter: {
    used_status: string;
    city: number;
    brand: number;
    modal: number;
    engine: number;
    specification: number;
    gearbox: number;
    fuel_type: number;
    modal_from: string;
    modal_to: string;
    from_price: string;
    to_price: string;
    walkway_from: string;
    walkway_to: string;
  };
  cities: { [x: string]: { id: any } };
  brands: { [x: string]: { id: any } };
  brandModals: { [x: string]: { id: any } };
  engineCapacity: { [x: string]: any };
  specifications: { [x: string]: { name_en: any } };
  gearboxs: { [x: string]: { name_en: any } };
  fuelTypes: { [x: string]: { name_en: any } };
}) => {
  let filterParasms = '?';
  if (params.filter.used_status !== 'all')
    filterParasms = filterParasms + `used_status=${params.filter.used_status}`;
  if (params.filter.city !== -1)
    filterParasms =
      filterParasms + `&city=${params.cities[params.filter.city].id}`;
  if (params.filter.brand !== -1)
    filterParasms =
      filterParasms + `&brand=${params.brands[params.filter.brand].id}`;
  if (params.filter.modal !== -1)
    filterParasms =
      filterParasms + `&car_type=${params.brandModals[params.filter.modal].id}`;
  if (params.filter.engine !== -1)
    filterParasms =
      filterParasms +
      `&engine_capacity=${params.engineCapacity[params.filter.engine]}`;
  if (params.filter.specification !== -1)
    filterParasms =
      filterParasms +
      `&feature=${params.specifications[params.filter.specification].name_en}`;
  if (params.filter.gearbox !== -1)
    filterParasms =
      filterParasms +
      `&gearbox=${params.gearboxs[params.filter.gearbox].name_en}`;
  if (params.filter.fuel_type !== -1)
    filterParasms =
      filterParasms +
      `&fuel=${params.fuelTypes[params.filter.fuel_type].name_en}`;
  // price

  // modal from  and modal to
  if (
    parseInt(params.filter.modal_from) > 2020 ||
    parseInt(params.filter.modal_from) < 1500
  ) {
    global.openToast('من فضلك ادخل تاربخ موديل صحيح', 'w');
    return false;
  } else {
    if (params.filter.modal_from)
      filterParasms =
        filterParasms + `&model_number__gte=${params.filter.modal_from}`;
  }

  if (
    parseInt(params.filter.modal_to) < parseInt(params.filter.modal_from) ||
    parseInt(params.filter.modal_to) > 2020
  ) {
    global.openToast('اكتب تاريخ موديل صحيح', 'w');
    return false;
  } else {
    if (params.filter.modal_to)
      filterParasms =
        filterParasms + `&model_number__lte=${params.filter.modal_to}`;
  }
  //////////////////////////////////////////////////////////

  // from price  and  to price
  if (parseInt(params.filter.from_price) >= 1) {
    filterParasms =
      filterParasms + `&car_price__gte=${params.filter.from_price}`;
  }

  if (parseInt(params.filter.to_price) < parseInt(params.filter.from_price)) {
    global.openToast('لا يمكن ان يكون بداية السعر اقل من النهاية', 'w');
    return false;
  } else {
    if (params.filter.to_price)
      filterParasms =
        filterParasms + `&car_price__lte=${params.filter.to_price}`;
  }
  //////////////////////////////////////////////////////////

  // walkway from  and walkway from
  if (parseInt(params.filter.walkway_from) >= 1) {
    filterParasms =
      filterParasms + `&walked_distance__gte=${params.filter.walkway_from}`;
  }

  if (
    parseInt(params.filter.walkway_to) < parseInt(params.filter.walkway_from)
  ) {
    global.openToast('لا يمكن ان يكون بداية الممشي اقل من النهاية', 'w');
    return false;
  } else {
    if (params.filter.walkway_to)
      filterParasms =
        filterParasms + `&walked_distance__lte=${params.filter.walkway_to}`;
  }
  //////////////////////////////////////////////////////////

  if (filterParasms === '?') filterParasms = '';

  return filterParasms;
};
