import React, { useEffect, useRef, useState } from 'react'
import { StyleProp, View, TouchableOpacityProps, Animated, Easing } from 'react-native'
import { Card, Text_, ViewRow } from '../../Molecules'
import styles from './styles'
import { FontFamilyType } from '../types'
import { config } from '../../config/appConfig'
import { RFValue } from 'react-native-responsive-fontsize'
import { Icons, IconsName } from '../../config/icons'
import { calcHeight, calcWidth } from '../../config/metrics'
import { Button } from '../Button/Button'
type TabButtonsProps = {
    style?: StyleProp<TouchableOpacityProps>;
    textStyle?: {
        fontFamily: FontFamilyType,
        color: String,
        fontSize: "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24",
    };

    iconStyle?: {
        width: Number,
        color: String,
        height: Number,
    };
    iconName: IconsName,
    text: String,
    onPress: Function,
    title:String
}
export function DropDown(params: TabButtonsProps) {

    const rotate = useRef(new Animated.Value(0)).current;
    const [isOpen, setIsOpen] = useState(params.isActive)

    useEffect(() => {
        Animated.timing(rotate, {
            toValue: ((typeof params.isActive!=="undefined")?params.isActive:isOpen) ? 1 : 0,
            easing: Easing.elastic(),
            duration: 500
        }).start();
    }, [isOpen,params.isActive]);

    let rotate_ = rotate.interpolate({ inputRange: [0, 1], outputRange: ["-90deg", "90deg"] })
    let height = rotate.interpolate({ inputRange: [0, 1], outputRange: [calcHeight(45), params.height] })
    return (
        <Animated.View style={{ height: height, overflow: "hidden", overflow: "hidden", width: calcWidth(345), backgroundColor: config.colors.WHITE, borderWidth: 1, borderColor: config.colors.BORDER_COLOR, borderRadius: RFValue(5, 812), paddingHorizontal: calcWidth(15), marginTop: calcHeight(10) }}>

            <View style={{ width: "100%" }}>
                <Button
                    onPress={() => {
                        setIsOpen((_isOpen)=>{
                            return !_isOpen
                        })
                        if (params.onPress)
                        params.onPress()
                    }}
                    style={{ height: calcHeight(45) }} >
                    <ViewRow withoutPadding style={{}} >
                        <Text_ style={{width:calcWidth(300)}} fontFamily={"medium"} color={config.colors.BASE_COLOR} textAlign={"left"} fontSize={"15"} >{params.title||"خيارات متقدمة"}</Text_>
                        <Animated.View style={{ transform: [{ rotate: rotate_ }] }}>
                            <Icons
                                name={"arrowBack"}
                                width={RFValue(9, 812)}
                                height={RFValue(14, 812)}
                                color={config.colors.BASE_COLOR}
                            />
                        </Animated.View>
                    </ViewRow>
                </Button>
            </View>
            {params.children}
        </Animated.View>

    )
}


