import { StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { config } from '../../config/appConfig'
import { calcWidth } from '../../config/metrics'


export default styles = StyleSheet.create({
    textStyle: {
        fontFamily: config.fonts.light,
        color: config.colors.GRAY,
        fontSize: RFValue(15, 812),
        paddingHorizontal:calcWidth(3)
    }
})