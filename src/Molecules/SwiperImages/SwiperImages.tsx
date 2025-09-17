import React from 'react'
import { config } from '../../config/appConfig'
import { View, ViewStyle, StyleProp, TouchableOpacity } from 'react-native'
import { calcHeight } from '../../config/metrics'
import Swiper from 'react-native-swiper'
import { Image_ } from '../Image/Image'


type SwiperImagesProps = {
    style?: StyleProp<ViewStyle>;
    verticalLine?: Boolean;
    size: String,
    onPress: Function,
    height: Number,
    loop: Boolean
}
export function SwiperImages(params: SwiperImagesProps) {
    return (
        <View
            style={{ width: "100%", height: params.height || calcHeight(146) }}
        >
            <Swiper
                // removeClippedSubviews={false}
                loop={false}
                paginationStyle={{ bottom: calcHeight(15) }}
                activeDotStyle={{ width: 4, height: 4, backgroundColor: config.colors.BLUE }}
                dotStyle={{ width: 4, height: 4, backgroundColor: "white" }}
                style={{ height: "100%", backgroundColor: config.colors.WHITE }}
            >
                {params.images.map((_item, index) => {
                    return <TouchableOpacity key={_item.id.toString()} onPress={() => params.onPress(index)} activeOpacity={.9} 
                    style={{ width: "100%", height: "100%" }}>
                        <Image_ source={{ uri: _item.image }} style={{ width: "100%", height: "100%" }} />
                    </TouchableOpacity>

                })}
            </Swiper>
        </View>
    )
}