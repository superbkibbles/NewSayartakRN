import React, { useState } from 'react'
import { View, FlatList, StyleProp, ViewStyle } from 'react-native'
import { calcHeight, calcWidth } from '../../config/metrics'
import { Button } from '../index'
import styles from './styles'
import { Input, Line, ViewRow } from '../../Molecules'
import { Icons } from '../../config/icons'
import { RFValue } from 'react-native-responsive-fontsize'
import { config } from '../../config/appConfig'


type InputSearchProps = {
    style?: StyleProp<ViewStyle>,
    items: Array,
    onChangeText:Function
}

export function InputSearch(params: InputSearchProps) {
    let [isSelected, setSelectedIndex] = useState(0)

    return (
        <View style={[styles.container, params.style]}>
            <ViewRow withoutPadding style={{ width: null, height: "100%" }}>
                <Icons name={"search"} width={RFValue(17, 812)} height={RFValue(17, 812)} color={config.colors.BASE_COLOR} />
                <Line verticalLine size={"50%"} style={{ marginHorizontal: calcWidth(10) }} />
            </ViewRow>
            <Input onChangeText={params.onChangeText} placeholder={"بحث عن معرض ..."} style={{ width: "90%", textAlign: "right", fontFamily: config.fonts.light }} />
        </View>
    )
}