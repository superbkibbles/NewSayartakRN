import React, { useEffect,useState } from 'react'
import { ActivityIndicator, Modal, View } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import ImageViewer from 'react-native-image-zoom-viewer';
import { calcHeight, calcWidth } from '../../config/metrics'
import { HeaderWithShare } from '../Header/Header';
import { Button } from '../Button/Button';
import { config } from '../../config/appConfig';
type ImageSwipViewProps = {
    isVisible: Boolean,
    data: Array
}
export function ImageSwipView(params: ImageSwipViewProps) {
    let [isVisible, setVisible] = useState(params.isVisible ? params.isVisible : false)
    let [urls, setUrls] = useState([])
    let _setVisible = () => {
        params.onClose()
        setVisible(false)
    }
    useEffect(() => {
        let images = []
        for (let i = 0; i < params.data.length; i++)
            images.push({ url: params.data[i].image })
        setUrls(images)
        setVisible(params.isVisible ? params.isVisible : false)
    }, [params.isVisible])
    return (
        <Modal
        statusBarTranslucent
            animationType={isVisible ? "fade" : "fade"}
            animated
            visible={isVisible}
            transparent={true}
        >
            <View style={{ width: calcWidth(), height: calcHeight() }}>



                <View
                    style={{ width: calcWidth(), height: calcHeight() }}
                >
                    <ImageViewer
                        loadingRender={() => {
                            return <ActivityIndicator color={"white"} size="large" />
                        }}
                        backgroundColor={"rgba(0,0,0,1)"}
                        onSwipeDown={_setVisible}
                        index={params.selectedIndex}
                        enableSwipeDown
                        swipeDownThreshold={calcHeight() / 5}
                        imageUrls={urls} />
                </View>
            </View>
            <Button onPress={_setVisible} style={{ paddingVertical: calcHeight(10), right: 0,position:"absolute",top:calcHeight(40),paddingHorizontal:calcWidth(15) }} iconName={"arrowBack"} iconStyle={{ color: config.colors.WHITE, width: RFValue(9, 812), height: RFValue(15, 812) }} />

        </Modal>


    )
}

ImageSwipView.defaultProps = {
    style: {},

};
