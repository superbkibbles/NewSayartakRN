import React, { useEffect, useRef } from 'react'
import { View, StyleProp, ViewStyle } from 'react-native'
import { Icons } from '../../config/icons'
import { calcHeight, calcWidth } from '../../config/metrics'
import { Text_, ViewRow } from '../../Molecules'
import { Image_ } from '../../Molecules/Image/Image'
import { config } from '../../config/appConfig'
import { RFValue } from 'react-native-responsive-fontsize'
import NavigationService from '../../navigation/NavigationService'
import ContentLoader, { Rect } from 'react-content-loader/native'
import ButtonScale from '../ButtonScale/ButtonScale'
import Animated, { Easing } from 'react-native-reanimated'


type ShowRoomsItemProps = {
    style?: StyleProp<ViewStyle>,
    onPress: Function
}
export function ShowRoomsItem(params: ShowRoomsItemProps) {
    let item = params
    const onCarPress = () => {
        NavigationService.navigate("CarDetails")
    }
    const layout = useRef(new Animated.Value(params.layout === "big" ? 0 : 1)).current
    useEffect(() => {
        Animated.timing(layout, {
            toValue: params.layout === "big" ? 0 : 1,
            duration: 500,
            easing: Easing.elastic()
        }).start()
    }, [params.layout])

    // change layout
    const containerHeight = layout.interpolate({ inputRange: [0, 1], outputRange: [calcHeight(150), calcHeight(78)] })
    const imageWidth = layout.interpolate({ inputRange: [0, 1], outputRange: [calcWidth(347), calcWidth(64)] })
    const imageHeight = layout.interpolate({ inputRange: [0, 1], outputRange: [calcHeight(84), calcHeight(64)] })

    const detailsContainerTop = layout.interpolate({ inputRange: [0, 1], outputRange: [calcHeight(90), calcHeight(10)] })
    const detailsContainerWidth = layout.interpolate({ inputRange: [0, 1], outputRange: [calcWidth(347), calcWidth(274)] })
    const detailsContainerLeft = layout.interpolate({ inputRange: [0, 1], outputRange: [calcWidth(0), calcWidth(71)] })
    const imageLeftAntTop = layout.interpolate({ inputRange: [0, 1], outputRange: [calcWidth(0), calcWidth(7)] })


    return (
        <ButtonScale
            activeScale={0.97}
            tension={200}
            friction={7}
            useNativeDriver
            onPress={params.onPress}
        >

            <Animated.View activeOpacity={.9}
                onPress={params.onPress}
                style={[{
                    width: calcWidth(347),
                    borderWidth: 1,
                    borderColor: config.colors.BORDER_COLOR,
                    height: containerHeight,
                    marginBottom: calcHeight(6),
                    borderRadius: RFValue(5, 812),
                    backgroundColor: config.colors.WHITE,
                    overflow: "hidden",
                    flexDirection: "column"
                }, params.style]}>
                <Animated.View style={{
                    width: imageWidth, height: imageHeight, borderRadius: 5, overflow: "hidden", left: imageLeftAntTop, top: imageLeftAntTop
                }}>
                    <Image_
                        source={{ uri: item.cover_photo }}
                        style={{ width: "100%", height: "100%" }} />
                </Animated.View>



                <Animated.View style={{ position: "absolute", top: detailsContainerTop, width: detailsContainerWidth, left: detailsContainerLeft }}>
                    <ViewRow
                        style={{ marginTop: calcHeight(9), alignItems: "flex-start" }}
                    >
                        <Text_ textAlign={"left"} fontSize={"14"} fontFamily={"bold"} style={{ width: "75%" }} >{item.showroom_name}</Text_>
                        <View style={{ paddingHorizontal: calcWidth(10), height: calcHeight(17), backgroundColor: config.colors.BASE_COLOR, borderRadius: calcHeight(17 / 2), alignItems: "center", justifyContent: "center" }}>
                            <Text_ textAlign={"left"} fontSize={"10"} fontFamily={"medium"} color={config.colors.WHITE}  >{` ${params.number_of_cars} سيارة `}</Text_>
                        </View>


                    </ViewRow>
                    <ViewRow
                        style={{ marginTop: calcHeight(9), alignItems: "flex-start" }}
                    >
                        <ViewRow
                            style={{ width: null, paddingHorizontal: 0, width: "68%" }}
                        >
                            <Icons name={"location"} width={RFValue(9, 812)} height={RFValue(12, 812)} color={config.colors.GRAY} />
                            <Text_ textAlign={"left"} fontSize={"10"} fontFamily={"medium"} style={{ paddingHorizontal: calcWidth(5), width: "100%" }} color={config.colors.GRAY} >{item.address}</Text_>
                        </ViewRow>
                        <Text_ textAlign={"left"} fontSize={"10"} fontFamily={"medium"} color={config.colors.BASE_COLOR}  >{"سيارة جديد/ مستعمل"}</Text_>
                    </ViewRow>
                </Animated.View>
            </Animated.View>
        </ButtonScale>
    )
}






export function LoadingShowRoomsItem(params) {
    let length = Array.from(Array(params.length).keys())
    return (
        <View duration={params.isLoading ? 10 : 1500} isActive={params.isLoading} style={[{ alignItems: "center" }, params.style]} >
            {length.map(() => {
                return (
                    <View
                        style={[{ width: calcWidth(347), borderColor: config.colors.BORDER_COLOR, height: calcHeight(params.layout === "big" ? 150 : 78), marginBottom: calcHeight(6), borderRadius: RFValue(5, 812), backgroundColor: config.colors.WHITE, overflow: "hidden" }]}>
                        <ContentLoader
                            title={"dfd"}
                            speed={.9}
                            backgroundColor={"#f2f2f2"}
                            foregroundColor={"#e0e0e0"}

                            viewBox={`0 0 ${calcWidth(347)} ${calcHeight(params.layout === "big" ? 150 : 78)}`}
                        >
                            <Rect x={calcWidth(params.layout === "big" ? 5 : 275)}
                                y={calcHeight(params.layout === "big" ? 5 : 7)} rx="5" ry="5" width={`${calcWidth(params.layout === "big" ? 337 : 64)}`} height={`${calcHeight(params.layout === "big" ? 84 : 64)}`} />
                           
                           
                            <Rect
                                x={calcWidth(15)}
                                y={calcHeight(params.layout==="big"?100:15)}
                                rx={`${calcHeight(15 / 2)}`}
                                ry={`${calcHeight(15 / 2)}`}
                                width={`${calcWidth(params.layout==="big"?70:60)}`}
                                height={`${calcHeight(15)}`}
                            />
                            <Rect
                                x={calcWidth(params.layout==="big"?192:150)}
                                y={calcHeight(params.layout==="big"?100:15)}
                                rx={`${calcHeight(15 / 2)}`}
                                ry={`${calcHeight(15 / 2)}`}
                                width={`${calcWidth(params.layout==="big"?150:110)}`}
                                height={`${calcHeight(15)}`}
                            />



                            {/* options */}
                            <Rect
                                x={calcWidth(15)}
                                y={calcHeight(params.layout==="big"?123:50)}
                                rx={`${calcHeight(15 / 2)}`}
                                ry={`${calcHeight(15 / 2)}`}
                                width={`${calcWidth(90)}`}
                                height={`${calcHeight(15)}`}
                            />

                            <Rect
                                x={calcWidth(params.layout==="big"?270:190)}
                                y={calcHeight(params.layout==="big"?123:50)}
                                rx={`${calcHeight(15 / 2)}`}
                                ry={`${calcHeight(15 / 2)}`}
                                width={`${calcWidth(50)}`}
                                height={`${calcHeight(15)}`}
                            />
                            <Rect
                                x={calcWidth(params.layout==="big"?327:245)}
                                y={calcHeight(params.layout==="big"?123:50)}
                                rx={`${calcHeight(15 / 2)}`}
                                ry={`${calcHeight(15 / 2)}`}
                                width={`${calcWidth(15)}`}
                                height={`${calcHeight(15)}`}
                            />
                        </ContentLoader>
                    </View>
                )
            })}
        </View>
    )

}