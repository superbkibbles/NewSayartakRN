import React, { useState } from 'react'
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native'
import { Text_ } from '../../Molecules'
import styles from './styles'
import { FontFamilyType } from '../types'
import { config } from '../../config/appConfig'
import { RFValue } from 'react-native-responsive-fontsize'
import { Icons, IconsName } from '../../config/icons'
import { DropDown } from '../DropDown/DropDown'
import { calcHeight } from '../../config/metrics'
type TabButtonsProps = {
    style?: StyleProp<ViewStyle>,
    title: String,
    isActive:Boolean,
    textStyle?: {
        fontFamily: FontFamilyType,
        color: String,
  
        body: String,
        fontSize: "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24",
    };

}
export function TextDropDown(params: TabButtonsProps) {
    const [height, setHegiht] = useState(0)
    return (
        <DropDown onPress={params.onPress} isActive={params.isActive} height={height + calcHeight(60)} title={params.title} >
            <Text_ onLayout={(event) => {
                setHegiht(event.nativeEvent.layout.height)
            }} textAlign={"left"} fontSize={"14"} fontFamily={"light"} >{params.body}</Text_>
        </DropDown>
    )
}

