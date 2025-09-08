import { StyleSheet } from 'react-native';
import { calcWidth, calcHeight } from '../../config/metrics';
import { config } from '../../config/appConfig';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: config.colors.BASE_COLOR,
  },
  logo: {
    width: calcHeight(250),
    height: calcWidth(120),
  },
  background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});

export default styles;
