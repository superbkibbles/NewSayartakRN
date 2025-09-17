import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { config } from '../../config/appConfig';
import { calcHeight, calcWidth } from '../../config/metrics';

const styles = StyleSheet.create({
  brandItem_container: {
    width: calcWidth(78),
    height: calcHeight(93),
    borderWidth: 1,
    borderColor: config.colors.BORDER_COLOR,
    marginRight: calcWidth(8),
    backgroundColor: config.colors.WHITE,
    borderRadius: RFValue(5, 812),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  icon: {
    width: RFValue(50, 812),
    height: RFValue(50, 812),
  },
  text: { marginTop: calcHeight(6) },
});

export default styles;
