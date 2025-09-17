import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  StyleProp,
  Text,
  ViewStyle,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import { Icons } from '../../config/icons';
import { calcHeight, calcWidth } from '../../config/metrics';
import { Text_, ViewRow } from '../../Molecules';
import { config } from '../../config/appConfig';
import { RFValue } from 'react-native-responsive-fontsize';
import { strings } from '../../Local/i18n';
import { SharedElement } from 'react-navigation-shared-element';
import { priceFormatter } from '../../utils/datesUtils';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { FadeView } from '../../Molecules/FadeView/FadeView';
import styles from './styles';
import { Image_ } from '../../Molecules/Image/Image';
import ButtonScale from '../ButtonScale/ButtonScale';

type CarItemProps = {
  style?: StyleProp<ViewStyle>;
};
export function CarItem(params: CarItemProps) {
  let item = params;
  let options = [...[item.model_number, strings(item.gearbox)]];
  let opacity = useRef(new Animated.Value(0)).current;
  console.log('itemitemitemitem', item);
  const layout = useRef(
    new Animated.Value(params.layout === 'big' ? 0 : 1),
  ).current;

  useEffect(() => {
    Animated.timing(layout, {
      toValue: params.layout === 'big' ? 0 : 1,
      duration: 500,
      easing: Easing.elastic(),
    }).start();
  }, [params.layout]);

  // change layout
  const containerHeight = layout.interpolate({
    inputRange: [0, 1],
    outputRange: [calcHeight(218), calcHeight(73)],
  });
  const imageWidth = layout.interpolate({
    inputRange: [0, 1],
    outputRange: [calcWidth(347), calcWidth(87)],
  });
  const detailsContainerTop = layout.interpolate({
    inputRange: [0, 1],
    outputRange: [calcHeight(150), calcHeight(10)],
  });
  const detailsContainerWidth = layout.interpolate({
    inputRange: [0, 1],
    outputRange: [calcWidth(347), calcWidth(258)],
  });
  const detailsContainerLeft = layout.interpolate({
    inputRange: [0, 1],
    outputRange: [calcWidth(0), calcWidth(87)],
  });
  const fontSize = layout.interpolate({
    inputRange: [0, 1],
    outputRange: [RFValue(11, 812), RFValue(7, 812)],
  });
  const margin = layout.interpolate({
    inputRange: [0, 1],
    outputRange: [RFValue(10, 812), RFValue(5, 812)],
  });

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      easing: Easing.elastic(),
    }).start();
  }, [params.isActive]);

  return (
    <ButtonScale
      activeScale={0.97}
      tension={200}
      friction={7}
      useNativeDriver
      onPress={params.onPress}
    >
      <Animated.View
        key={`${item.id}`}
        style={[
          styles.carItem_container,
          params.style,
          { opacity: opacity, height: containerHeight },
        ]}
      >
        <Animated.View style={{ width: imageWidth }}>
          <SharedElement id={`item.${item.id}.photo`}>
            <Image_
              source={{ uri: item.images.length ? item.images[0].image : '' }}
              style={{
                height: '100%',
                maxHeight: calcHeight(146),
                width: '100%',
              }}
            />
          </SharedElement>
        </Animated.View>

        <Animated.View
          style={{
            position: 'absolute',
            top: detailsContainerTop,
            width: detailsContainerWidth,
            left: detailsContainerLeft,
          }}
        >
          <ViewRow
            style={{ marginTop: calcHeight(9), alignItems: 'flex-start' }}
          >
            <Text_
              numberOfLines={1}
              textAlign={'left'}
              fontSize={'14'}
              fontFamily={'bold'}
              style={{ width: '70%' }}
            >
              {item.name}
            </Text_>
            <Text_
              fontFamily={'bold'}
              fontSize={'14'}
              color={config.colors.RED}
            >
              {`${priceFormatter(item.car_price)} دولار`}
            </Text_>
          </ViewRow>

          <ViewRow
            style={{ marginTop: calcHeight(9), alignItems: 'flex-start' }}
          >
            <ViewRow style={{ width: null, paddingHorizontal: 0 }}>
              <Icons
                name={'location'}
                width={RFValue(9, 812)}
                height={RFValue(12, 812)}
                color={config.colors.GRAY}
              />
              <Text_
                textAlign={'left'}
                fontSize={'10'}
                numberOfLines={2}
                fontFamily={'medium'}
                style={{
                  paddingHorizontal: calcWidth(5),
                  width: calcWidth(140),
                }}
                color={config.colors.GRAY}
              >
                {item.address}
              </Text_>
            </ViewRow>

            <View style={{ flexDirection: 'row' }}>
              {options.map(option => {
                return option ? (
                  <View
                    key={option}
                    style={{
                      paddingHorizontal: calcWidth(6),
                      height: calcHeight(17),
                      backgroundColor: config.colors.BASE_COLOR,
                      borderRadius: calcHeight(17 / 2),
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginLeft: calcWidth(5),
                    }}
                  >
                    <Text_
                      textAlign={'left'}
                      fontSize={'10'}
                      fontFamily={'medium'}
                      color={config.colors.WHITE}
                    >
                      {option}
                    </Text_>
                  </View>
                ) : null;
              })}
            </View>
          </ViewRow>
        </Animated.View>

        {params.state && (
          <View
            style={{
              height: calcHeight(19),
              backgroundColor: getStatus(params.verification_status).color,
              paddingHorizontal: calcWidth(10),
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: calcHeight(19 / 2),
              right: calcWidth(10),
              top: calcHeight(10),
            }}
          >
            <Text_
              fontSize={'11'}
              fontFamily={'bold'}
              color={config.colors.WHITE}
            >
              {getStatus(params.verification_status).text}
            </Text_>
          </View>
        )}

        <Animated.View
          style={{
            height: calcHeight(19),
            backgroundColor:
              item.used_status == 'used'
                ? config.colors.RED
                : config.colors.GREEN,
            paddingHorizontal: calcWidth(10),
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: calcHeight(19 / 2),
            left: margin,
            top: margin,
          }}
        >
          <Animated.Text
            style={{
              fontFamily: config.fonts.bold,
              fontSize: fontSize,
              color: config.colors.WHITE,
            }}
          >
            {strings(item.used_status)}
          </Animated.Text>
        </Animated.View>
      </Animated.View>
    </ButtonScale>
  );
}

const getStatus = status => {
  switch (status) {
    case 'sold':
      return { color: config.colors.GREEN, text: 'تم بيع السياره' };
    case 'in_review':
      return { color: config.colors.ORANGE, text: 'قيد المراجعة' };
    case 'accepted':
      return { color: config.colors.GREEN, text: 'تم النشر' };
    case 'rejected':
      return { color: config.colors.RED, text: 'اعلان مرفوض' };
    case 'need_updates':
      return { color: config.colors.RED, text: 'مطلوب تعديل البيانات' };
    default:
      return { color: config.colors.ORANGE, text: 'قيد المراجعة' };
  }
};

export function LoadingCarItem(params) {
  let length = Array.from(Array(params.length).keys());
  const [layout, setLayout] = useState(params.layout);
  useEffect(() => {
    setLayout(params.layout);
  }, [params.layout]);

  return params.isLoading ? (
    <View
      duration={params.isLoading ? 10 : 1500}
      isActive={params.isLoading}
      style={[{ alignItems: 'center' }, params.style]}
    >
      {length.map((item, index) => {
        return (
          <View
            key={`loadingCarItem${index}`}
            style={[
              {
                width: calcWidth(347),
                borderColor: config.colors.BORDER_COLOR,
                height: calcHeight(layout === 'big' ? 218 : 73),
                marginBottom: calcHeight(6),
                borderRadius: RFValue(5, 812),
                backgroundColor: config.colors.WHITE,
                overflow: 'hidden',
              },
            ]}
          >
            <ContentLoader
              title={'dfd'}
              // height={calcHeight(218)}
              speed={0.9}
              backgroundColor={'#f2f2f2'}
              foregroundColor={'#e0e0e0'}
              viewBox={`0 0 ${calcWidth(347)} ${calcHeight(
                layout === 'big' ? 218 : 73,
              )}`}
            >
              <Rect
                x={calcWidth(layout === 'big' ? 5 : 265)}
                y={calcHeight(5)}
                rx="5"
                ry="5"
                width={`${calcWidth(layout === 'big' ? 337 : 77)}`}
                height={`${calcHeight(layout === 'big' ? 146 : 63)}`}
              />
              <Rect
                x={calcWidth(5)}
                y={calcHeight(layout === 'big' ? 157 : 10)}
                rx={`${calcHeight(15 / 2)}`}
                ry={`${calcHeight(15 / 2)}`}
                width={`${calcWidth(layout === 'big' ? 100 : 60)}`}
                height={`${calcHeight(15)}`}
              />
              <Rect
                x={calcWidth(layout === 'big' ? 192 : 145)}
                y={calcHeight(layout === 'big' ? 157 : 10)}
                rx={`${calcHeight(15 / 2)}`}
                ry={`${calcHeight(15 / 2)}`}
                width={`${calcWidth(layout === 'big' ? 150 : 110)}`}
                height={`${calcHeight(15)}`}
              />

              {/* options */}
              <Rect
                x={calcWidth(5)}
                y={calcHeight(layout === 'big' ? 177 : 42)}
                rx={`${calcHeight(15 / 2)}`}
                ry={`${calcHeight(15 / 2)}`}
                width={`${calcWidth(layout === 'big' ? 50 : 35)}`}
                height={`${calcHeight(20)}`}
              />
              <Rect
                x={calcWidth(layout === 'big' ? 60 : 45)}
                y={calcHeight(layout === 'big' ? 177 : 42)}
                rx={`${calcHeight(15 / 2)}`}
                ry={`${calcHeight(15 / 2)}`}
                width={`${calcWidth(layout === 'big' ? 50 : 35)}`}
                height={`${calcHeight(20)}`}
              />
              <Rect
                x={calcWidth(layout === 'big' ? 115 : 85)}
                y={calcHeight(layout === 'big' ? 177 : 42)}
                rx={`${calcHeight(15 / 2)}`}
                ry={`${calcHeight(15 / 2)}`}
                width={`${calcWidth(layout === 'big' ? 50 : 35)}`}
                height={`${calcHeight(20)}`}
              />
              {/* end options */}
              <Rect
                x={calcWidth(layout === 'big' ? 270 : 185)}
                y={calcHeight(layout === 'big' ? 177 : 42)}
                rx={`${calcHeight(15 / 2)}`}
                ry={`${calcHeight(15 / 2)}`}
                width={`${calcWidth(50)}`}
                height={`${calcHeight(15)}`}
              />
              <Rect
                x={calcWidth(layout === 'big' ? 327 : 240)}
                y={calcHeight(layout === 'big' ? 177 : 42)}
                rx={`${calcHeight(15 / 2)}`}
                ry={`${calcHeight(15 / 2)}`}
                width={`${calcWidth(15)}`}
                height={`${calcHeight(15)}`}
              />
            </ContentLoader>
          </View>
        );
      })}
    </View>
  ) : null;
}
