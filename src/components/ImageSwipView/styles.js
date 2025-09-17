import { StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { config } from '../../config/appConfig'
import { calcHeight, calcWidth } from '../../config/metrics'


export default styles = StyleSheet.create({
    textStyle: {
        fontFamily: config.fonts.light,
        color: config.colors.GRAY,
        fontSize: RFValue(15, 812),
        paddingHorizontal: calcWidth(3)
    },
    buttonStyle: {
        backgroundColor: config.colors.BASE_COLOR, width: calcWidth(345),
        alignItems: "center", justifyContent: "center", height: calcHeight(40),
        borderRadius: calcHeight(45 / 2), marginTop: calcHeight(10)
    }
})