import { StyleSheet } from 'react-native';
import { config } from '../../config/appConfig';
import { calcHeight, calcWidth } from '../../config/metrics';

const styles = StyleSheet.create({
  container: {
    width: calcWidth(335),
    height: calcHeight(42),
    backgroundColor: config.colors.WHITE,
    borderRadius: calcHeight(42 / 2),
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: calcWidth(15),
  },
  selectButtonStyle: { fontFamily: 'bold', color: config.colors.BLUE },
  buttonStyles: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
});

export default styles;
