import React, { useState } from 'react'
import { Animated, View,Easing } from 'react-native'
import { config } from '../../config/appConfig'
import { calcHeight, calcWidth } from '../../config/metrics'
import { GradientView, Text_, ViewRow } from '../../Molecules'
import { RFValue } from "react-native-responsive-fontsize"
import { TabButtons } from '../index'
import { strings } from '../../Local/i18n'
import { Icons } from '../../config/icons'
import { Button } from '../Button/Button'
import NavigationService from '../../navigation/NavigationService'
import { Badge } from '../../Molecules/Badge/Badge'
import { InputSearch } from '../InputSearch/InputSearch'
import LinearGradient from 'react-native-linear-gradient'
import { useSelector } from 'react-redux'
// import { Easing } from 'react-native-reanimated'

type HeaderProps = {
    style?: StyleProp<ViewStyle>,
    isFavourite: Boolean,
    onFavourite: Function
}
export function Header(params: HeaderProps) {
    let notificationCount = useSelector((state) => state.presistReducer.notificationCount)
    let token = useSelector((state) => state.presistReducer.token)
    const onBack = () => {
        NavigationService.goBack()
    }
    const onNotification = () => {
        if (token)
            NavigationService.navigate("Notification")
        else
            NavigationService.navigate("SignIn")
    }



    let bottom = 0
    let height=calcHeight(params.buttons || params.onSearch ? 128 : 107)
    let _height=calcHeight(params.buttons || params.onSearch ? 128 : 107)
    let opacity=1

    let gradientHeight=1

    if (params.y) {
        bottom = params.y.interpolate({ inputRange: [0, calcHeight(200)], outputRange: [0, calcHeight(20)], extrapolate: "clamp",easing:Easing.elastic() })
        _height = params.y.interpolate({ inputRange: [0, calcHeight(200)], outputRange: [height, height-30], extrapolate: "clamp",easing:Easing.elastic() })
        gradientHeight = params.y.interpolate({ inputRange: [0, calcHeight(200)], outputRange: [calcHeight(107), calcHeight(96)], extrapolate: "clamp",easing:Easing.elastic() })
        opacity = params.y.interpolate({ inputRange: [0, calcHeight(200)], outputRange: [1, 0], extrapolate: "clamp",easing:Easing.elastic() })

    }


    return (
        <Animated.View style={[{ width: "100%", alignItems: "center", zIndex: 100, height: _height }, params.style]}>
            <GradientView
                style={{ width: "100%", height: (params.style && params.style.height) ? params.style.height : gradientHeight, borderBottomEndRadius: RFValue(10, 812), borderBottomStartRadius: RFValue(10, 812), alignItems: "center", justifyContent: "center" }}>
                <Animated.View style={{ marginTop: calcHeight((params.buttons || params.onSearch) ? 10 : 30),opacity:opacity,flexDirection:"row",justifyContent:"space-between",width:"100%",paddingHorizontal:calcWidth(15) }}>
                    <Text_
                    style={{lineHeight:RFValue(22,812)}}
                        fontFamily={"medium"}
                        color={config.colors.WHITE}
                        fontSize={"20"} >
                        {params.title}
                    </Text_>
                    <Button
                        style={{ paddingBottom: 15, paddingLeft: 15 }}
                        onPress={params.onBack ? onBack : onNotification}
                        iconName={params.onBack ? "arrowBack" : "notification"}
                        iconStyle={{
                            width: RFValue(params.onBack ? 9 : 18, 812),
                            height: RFValue(params.onBack ? 16 : 22, 812),
                            color: config.colors.WHITE
                        }}
                    >
                        {!params.onBack && <Badge count={notificationCount} style={{ right: calcWidth(10), top: -calcHeight(5) }} />}
                    </Button>

                </Animated.View>
            </GradientView>
            <Animated.View style={{ position: "absolute", zIndex: 200, paddingBottom: bottom,bottom:0 }}>
                {params.buttons && <TabButtons
                    items={params.buttons}
                />}
            {params.onSearch && <InputSearch onChangeText={params.onSearch} style={{ }} />}

            </Animated.View>



            <ViewRow>

            </ViewRow>
        </Animated.View>
    )
}






export function HeaderWithShare(params: HeaderProps) {
    let [isFavourite, setFavourite] = useState(params.isFavourite)
    const onBack = () => {
        NavigationService.goBack()
    }
    let token = useSelector((state) => state.presistReducer.token)

    const onFavourite = () => {
        if (token) {
            setFavourite(!isFavourite)
            params.onFavourite(!isFavourite)
        } else
            NavigationService.navigate("SignIn")


    }
    return (
        <View style={{ position: "absolute", width: "100%", height: calcHeight(130) }}>
            <LinearGradient
                end={{ x: 1, y: 0 }}
                start={{ x: 1, y: 1 }}
                colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}

                style={{ width: "100%", height: "100%", position: "absolute" }}
            >
            </LinearGradient>
            <ViewRow style={{ top: calcHeight(40), position: "absolute", alignItems: "center" }}>

                <ViewRow style={{ width: calcWidth(50), paddingHorizontal: 0 }}>
                    {/* <Button iconName={"share"} iconStyle={{ color: config.colors.WHITE, width: RFValue(19, 812), height: RFValue(19, 812) }} /> */}
                    <Button onPress={onFavourite} iconName={isFavourite ? "activeStar" : "star"} iconStyle={{ color: config.colors.WHITE, width: RFValue(21, 812), height: RFValue(21, 812) }} />
                </ViewRow>
                <Button onPress={onBack} style={{ paddingVertical: calcHeight(10), paddingLeft: calcWidth(15) }} iconName={"arrowBack"} iconStyle={{ color: config.colors.WHITE, width: RFValue(9, 812), height: RFValue(15, 812) }} />


            </ViewRow>


        </View>

    )
}
