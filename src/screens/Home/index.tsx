import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAllCars } from '../../store/thunks/apiThunks';
import { changeLayout } from '../../store/slices/appSettingsSlice';
import HomeView from './HomeView';
import NavigationService from '../../navigation/NavigationService';

function Home() {
  const dispatch = useAppDispatch();

  // State selectors
  const homeCarsLayout = useAppSelector(
    state => state.appSettings.homeCarsLayout,
  );
  const isThare_CarsPages = useAppSelector(
    state => state.persist.isThare_CarsPages,
  );
  const all_cars_nextPage = useAppSelector(
    state => state.persist.all_cars_nextPage,
  );
  const sorting_items = useAppSelector(
    state => state.appSettings.sorting_items,
  );
  const brands = useAppSelector(state => state.persist.brands);
  const cars_list = useAppSelector(state => state.persist.cars);
  const isLoading = useAppSelector(state => state.loading.GET_ALL_CARS);

  // Local state
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sortingBy, setSortingBy] = useState('-created_at');

  const onBrandCars = (item: any) => {
    NavigationService.navigate('ResultSearch', {
      item,
      filterUrl: `?brand=${item.id}`,
    });
  };

  useEffect(() => {
    // Load initial cars data
    dispatch(
      getAllCars({
        filters: { ordering: '-created_at' },
      }),
    );
  }, [dispatch]);

  const sortingCars = (item: any, index: number) => {
    setSortingBy(item.sortingKye);
    dispatch(
      getAllCars({
        page: 1, // Reset to first page when sorting changes
        filters: {
          ordering: item.sortingKye,
          ...(statusFilter &&
            statusFilter !== 'all' && { used_status: statusFilter }),
        },
      }),
    );
  };

  const onSetStatusFilter = (value: string) => {
    setStatusFilter(value);

    if (value !== statusFilter) {
      const filters: any = { ordering: sortingBy };
      if (value !== 'all') {
        filters.used_status = value;
      }

      dispatch(
        getAllCars({
          page: 1, // Reset to first page when filter changes
          filters,
        }),
      );
    }
  };

  const onLoadMoreData = () => {
    if (isThare_CarsPages && !isLoading) {
      const filters: any = { ordering: sortingBy };
      if (statusFilter && statusFilter !== 'all') {
        filters.used_status = statusFilter;
      }

      dispatch(
        getAllCars({
          page: all_cars_nextPage,
          filters,
        }),
      );
    }
  };

  const onRefresh = () => {
    const filters: any = { ordering: sortingBy };
    if (statusFilter && statusFilter !== 'all') {
      filters.used_status = statusFilter;
    }

    dispatch(
      getAllCars({
        page: 1,
        filters,
      }),
    );
  };

  const onChangeLayout = (layout: string, component_type: string) => {
    dispatch(changeLayout({ layout, component_type }));
  };

  return (
    <HomeView
      homeCarsLayout={homeCarsLayout}
      isThare_CarsPages={isThare_CarsPages}
      all_cars_nextPage={all_cars_nextPage}
      sorting_items={sorting_items}
      brands={brands}
      cars_list={cars_list}
      isLoading={isLoading}
      statusFilter={statusFilter}
      onChangeLayout={onChangeLayout}
      onRefresh={onRefresh}
      onLoadMoreData={onLoadMoreData}
      onSetStatusFilter={onSetStatusFilter}
      onBrandCars={onBrandCars}
      sortingCars={sortingCars}
    />
  );
}

export default Home;
