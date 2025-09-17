import React from 'react'
import { View, ViewStyle, StyleProp } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { SvgCssUri } from 'react-native-svg'
import { config } from '../../config/appConfig'
import { Icons } from '../../config/icons'
import { calcHeight, calcWidth } from '../../config/metrics'
import { Text_, ViewRow, Line } from '../../Molecules'
import { Image_ } from '../../Molecules/Image/Image'
import { Button } from '../index'

type FilterBrandItemProps = {
    style?: StyleProp<ViewStyle>;
    onPress: Function
}
export function FilterBrandItem(params: FilterBrandItemProps) {
    let isSvg = -1
    if (params.icon)
        isSvg = params.icon.indexOf(".svg") !== -1

    return (
        <Button
            onPress={params.onPress}
            style={{ flexDirection: "column" }} >
            <ViewRow
                style={{
                    width: calcWidth(),
                    justifyContent: "space-between",
                    paddingVertical: calcHeight(10)
                }} >
                <ViewRow
                    withoutPadding
                    style={{ width: null }} >

                    {isSvg ? <SvgCssUri
                        width={RFValue(25, 812)}
                        height={RFValue(30, 812)}
                        uri={params.icon}
                    /> : params.icon ? <Image_
                        resizeMode={"contain"}
                        style={{
                            width: RFValue(25, 812),
                            height: RFValue(30, 812)
                        }}
                        source={{ uri: params.icon }}
                    /> : <View style={{ height: RFValue(40, 812) }} />

                    }

                    {/* {params.icon ? <Image_
                        resizeMode={"contain"}
                        style={{
                            width: RFValue(24, 812),
                            height: RFValue(30, 812)
                        }}
                        source={{ uri: params.icon }}
                    /> : <View style={{ height: RFValue(30, 812) }} />} */}
                    <Text_
                        style={{ paddingHorizontal: calcWidth(5) }}
                        fontSize={"14"}
                        fontFamily={"medium"} >
                        {params.name}
                    </Text_>
                </ViewRow>

                {params.isSelected ? <Icons
                    name={"check2"}
                    width={RFValue(15.812)}
                    height={RFValue(15, 812)}
                    color={config.colors.BASE_COLOR} /> : <View />}
            </ViewRow>
            <Line />
        </Button>
    )
}