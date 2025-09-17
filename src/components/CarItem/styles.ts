import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { config } from '../../config/appConfig';
import { calcHeight, calcWidth } from '../../config/metrics';

const styles = StyleSheet.create({
  carItem_container: {
    width: calcWidth(347),
    borderWidth: 1,
    borderColor: config.colors.BORDER_COLOR,
    height: calcHeight(218),
    marginBottom: calcHeight(6),
    borderRadius: RFValue(5, 812),
    backgroundColor: config.colors.WHITE,
    overflow: 'hidden',
  },
});

export default styles;
