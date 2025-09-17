import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../actions/Actions';
import HomeView from './HomeView';
import {
  getAllCars,
  getNotViewdNotificationCount,
} from '../../api/ApisFunctions';
import * as Types from '../../actions/types';
import NavigationService from '../../navigation/NavigationService';
// import messaging from '@react-native-firebase/messaging'
// import OneSignal from 'react-native-onesignal';

function Home(params) {
  let [statusFilter, setStatusFilter] = useState(null);
  let [sortingBy, setSortingBy] = useState('-created_at');
  const onBrandCars = item => {
    NavigationService.navigate('ResultSearch', {
      item,
      filterUrl: `?brand=${item.id}`,
    });
  };
  useEffect(() => {
    //   OneSignal.setNotificationWillShowInForegroundHandler(notifReceivedEvent => {
    //     params.requestAction(getNotViewdNotificationCount())

    // });

    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    // });
    params.getAllCars(getAllCars('?ordering=-created_at', true));
    // return unsubscribe;
  }, []);

  const sortingCars = (item, index) => {
    setSortingBy(item.sortingKye);
    params.getAllCars(getAllCars('?ordering=' + item.sortingKye, true));
  };
  const onSetStatusFilter = value => {
    setStatusFilter(value);
    let url = '';
    if (value !== 'all') url = '&used_status=' + value;
    if (value != statusFilter) {
      params.getAllCars(getAllCars('?ordering=' + sortingBy + url, true));
    }
  };

  const onLoadMoreData = () => {
    if (params.isThare_CarsPages && !params.isLoading) {
      let url = `?page=${params.all_cars_nextPage}&ordering=${sortingBy}`;
      if (statusFilter && statusFilter !== 'all')
        url = url + '&used_status=' + statusFilter;
      params.getAllCars(getAllCars(url));
    }
  };

  const onRefresh = () => {
    let url = `?page=${1}&ordering=${sortingBy}`;
    if (statusFilter && statusFilter !== 'all')
      url = url + '&used_status=' + statusFilter;
    params.getAllCars(getAllCars(url));
  };
  return (
    <HomeView
      onChangeLayout={params.changeLayout}
      onRefresh={onRefresh}
      statusFilter={statusFilter}
      onLoadMoreData={onLoadMoreData}
      onSetStatusFilter={onSetStatusFilter}
      onBrandCars={onBrandCars}
      sortingCars={sortingCars}
      {...params}
    />
  );
}
function mapStateToProps(state) {
  return {
    homeCarsLayout: state.appSettingsReducer.homeCarsLayout,
    isThare_CarsPages: state.presistReducer.isThare_CarsPages,
    all_cars_nextPage: state.presistReducer.all_cars_nextPage,
    sorting_items: state.appSettingsReducer.sorting_items,
    brands: state.presistReducer.brands,
    cars_list: state.presistReducer.cars,
    isLoading: state.loadingReducer[Types.GET_ALL_CARS],
  };
}
function mapDispatchToProps(dispatch) {
  return {
    changeLayout: (layout, component_type) =>
      dispatch(Actions.changeLayout(layout, component_type)),
    getAllCars: paylaod => dispatch(Actions.requestAction(paylaod)),
    requestAction: paylaod => dispatch(Actions.requestAction(paylaod)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
