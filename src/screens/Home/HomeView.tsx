import React, { useState } from 'react';
import { View, FlatList, Animated } from 'react-native';
import { config } from '../../config/appConfig';
import { calcHeight, calcWidth } from '../../config/metrics';
import { BrandItem, Button, Header, CarItem } from '../../components';
import { Line, Text_, ViewRow } from '../../Molecules';
import NavigationService from '../../navigation/NavigationService';
import { strings } from '../../Local/i18n';
import { SortingModal } from '../../components/Modals/SortingModal/SortingModal';
import LayoutAndSortingCars from '../../components/LayoutAndSortingCars/LayoutAndSortingCars';
import { LoadingCarItem } from '../../components/CarItem/CarItem';
import EmptyCars from '../../Molecules/Loading/EmptyCars';
import UpdateVersionModal from '../../components/Modals/UpdateVersionModal/UpdateVersionModal';

function HomeView(params: {
  onSetStatusFilter: (arg0: string) => void;
  brands: ArrayLike<any> | null | undefined;
  onBrandCars: (arg0: any) => any;
  homeCarsLayout: string;
  sorting_items: any[];
  isLoading: any;
  onRefresh: (() => void) | null | undefined;
  onLoadMoreData:
    | ((info: { distanceFromEnd: number }) => void)
    | null
    | undefined;
  cars_list: string | ArrayLike<any> | null | undefined;
  sortingCars: (arg0: any, arg1: any) => void;
}) {
  const [showSortingModal, setShowSortingModal] = useState(false);
  const [sortingTitle, setSortingTitle] = useState(-1);
  const onCarPress = item => {
    NavigationService.navigate('CarDetails', { item });
  };
  const onSorting = item => {
    setShowSortingModal(true);
  };
  let y = new Animated.Value(0);

  let buttons = [
    {
      title: strings('all'),
      onPress: index => {
        y.setValue(0);
        params.onSetStatusFilter('all');
      },
    },
    {
      title: strings('new'),
      onPress: index => {
        y.setValue(0);
        params.onSetStatusFilter('new');
      },
    },
    {
      title: strings('used'),
      onPress: index => {
        y.setValue(0);
        params.onSetStatusFilter('used');
      },
    },
  ];

  // bottom =y.interpolate({ inputRange: [0, calcHeight(50)], outputRange: [0, calcHeight(50)], extrapolate: "extend" ,easing:Easing.})

  const ListHeaderComponent = () => {
    return (
      <View style={{ width: calcWidth() }}>
        <ViewRow
          style={{ marginTop: calcHeight(20), paddingVertical: calcHeight(10) }}
        >
          <Text_>{'الماركات'}</Text_>
          <Button
            onPress={() => {
              NavigationService.navigate('Brands');
            }}
            textStyle={{ fontSize: '12', color: config.colors.BASE_COLOR }}
            text={'شاهد الكل'}
          />
        </ViewRow>

        {/* brand view */}
        <View style={{ width: '100%', paddingBottom: calcHeight(6) }}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: calcWidth(15) }}
            horizontal
            data={params.brands}
            renderItem={({ item, index }) => {
              return (
                <BrandItem
                  onPress={() => params.onBrandCars(item)}
                  key={item.id}
                  {...item}
                />
              );
            }}
          />
        </View>
        <Line size={'100%'} />
        {/* //////////////////////////// */}

        {/* Layout */}
        <LayoutAndSortingCars
          component_type={'homeCarsLayout'}
          layout={params.homeCarsLayout}
          data={params.sorting_items}
          selectedIndex={sortingTitle}
          onSorting={onSorting}
        />
        {/* //////////////////////////// */}
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: config.colors.BACKGROUND,
        alignItems: 'center',
      }}
    >
      <Header
        y={y}
        onSetStatus={params.onSetStatusFilter}
        title={strings('home')}
        buttons={buttons}
      />

      <FlatList
        initialNumToRender={20}
        refreshing={params.isLoading || false}
        onRefresh={params.onRefresh}
        onEndReached={params.onLoadMoreData}
        onEndReachedThreshold={0.1}
        // bounces={false}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: y } } },
        ])}
        scrollEventThrottle={0.1}
        key={params.cars_list.length ? `${params.cars_list[0].id}` : ''}
        ListHeaderComponent={() => {
          return <ListHeaderComponent />;
        }}
        ListEmptyComponent={() => {
          return !params.isLoading ? (
            <EmptyCars marginTop={calcHeight(50)} text={'لا يوجد سيارات'} />
          ) : (
            <View></View>
          );
        }}
        ListFooterComponent={() => {
          return params.isLoading ? (
            <View style={{ width: calcWidth() }}>
              <LoadingCarItem
                layout={params.homeCarsLayout}
                loadingCard={true}
                length={params.homeCarsLayout === 'big' ? 3 : 6}
                style={{}}
                isLoading={true}
              />
            </View>
          ) : (
            <View />
          );
        }}
        style={{ width: '100%', zIndex: 1, marginTop: -calcHeight(21) }}
        contentContainerStyle={{ alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
        data={params.cars_list}
        renderItem={({ item, index }) => {
          return (
            <CarItem
              layout={params.homeCarsLayout}
              key={item.id}
              onPress={() => onCarPress(item)}
              {...item}
            />
          );
        }}
      />
      <SortingModal
        data={params.sorting_items}
        onCancel={() => setShowSortingModal(false)}
        onSelected={(item, index) => {
          setSortingTitle(index);
          params.sortingCars(item, index);
          setShowSortingModal(false);
        }}
        isVisible={showSortingModal}
      />
      <UpdateVersionModal isVisible={true} />
    </View>
  );
}

export default HomeView;
