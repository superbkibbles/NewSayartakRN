import React from 'react'
import { View } from 'react-native'
import { Text_, ViewRow, Line } from '../../Molecules'
import { config } from '../../config/appConfig'
import { RFValue } from 'react-native-responsive-fontsize'
import { Icons } from '../../config/icons'
import { Button } from '../Button/Button'
import { calcHeight, calcWidth } from '../../config/metrics'
type SelectItemButtonProps = {
    text: String,
    value: String,
    isLast: Boolean,
    onPress: Function,
}
export function SelectItemButton(params: SelectItemButtonProps) {
    return (
        <View style={{ width: "100%" }}>
            <Button onPress={params.onPress} style={{ paddingVertical: calcHeight(15) }} >
                <ViewRow withoutPadding style={{}} >
                    <Text_ fontFamily={"medium"} fontSize={"15"} >{params.text}</Text_>
                    <ViewRow withoutPadding style={{ width: null }}>
                        <Text_ fontFamily={"light"} color={config.colors.BASE_COLOR} style={{ paddingHorizontal: calcWidth(5) }} fontSize={"14"} >{params.value}</Text_>
                        <Icons
                            name={"arrowBack"}
                            width={RFValue(9, 812)}
                            height={RFValue(14, 812)}
                            color={config.colors.GRAY}
                        />
                    </ViewRow>
                </ViewRow>
            </Button>
            {!params.isLast && <Line />}
        </View>
    )
}

