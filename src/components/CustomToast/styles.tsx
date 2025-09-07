import { calcWidth } from '../../config/metrics';
import { config } from '../../config/appConfig';
import { RFValue } from 'react-native-responsive-fontsize';

export const styles = {
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
  },
  contentContainer: (state: string) => ({
    backgroundColor:
      state === 'error'
        ? 'rgba(234,67,53,1)'
        : state === 'check'
        ? 'rgba(52,168,83,1)'
        : 'rgba(251,188,5,1)',
    width: '87%',
    alignItems: 'center',
    borderRadius: RFValue(10, 812),
    position: 'absolute',
    justifyContent: 'center',
  }),
  closeButton: {
    width: calcWidth(39),
    height: calcWidth(39),
    borderRadius: calcWidth(39 / 2),
    backgroundColor: 'white',
    shadow: 6,
    position: 'absolute',
    top: 0,
    right: calcWidth(39 / 2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentView: {
    width: '100%',
    bottom: 0,
    position: 'absolute',
  },
  content: {
    width: '100%',
    height: '100%',
  },
  toastText: {
    paddingHorizontal: calcWidth(8),
    fontSize: calcWidth(12),
    color: 'white',
    maxWidth: calcWidth(275),
    fontFamily: config.fonts.medium,
    textAlign: 'center',
  },
};
