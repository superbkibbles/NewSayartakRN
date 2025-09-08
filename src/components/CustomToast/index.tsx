import React, { Component } from 'react';
import { Text, View, Animated, Keyboard } from 'react-native';
import { styles } from './styles';
// import { SvgIcon } from '../../config/svg';
import { calcWidth, calcHeight } from '../../config/metrics';
import { isIos } from '../../config/func';

var currentThread: number | null = null;

export class CustomToast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
      transAnim: new Animated.Value(0),
      errorMessage: '',
      state: 'check',
      isKeybordOpend: false,
    };
  }
  componentDidMount() {
    if (isIos()) {
      Keyboard.addListener('keyboardDidShow', () => {
        this.setState({ isKeybordOpend: true });
      });
      Keyboard.addListener('keyboardDidHide', () => {
        this.setState({ isKeybordOpend: false });
      });
    }

    global.openToast = this.open;
  }
  open = (message, state) => {
    let { isKeybordOpend } = this.state;

    let _state = {
      e: 'error',
      s: 'check',
      w: 'info',
    };
    // this.setState({ massage, state: _state[state] })
    if (currentThread) clearTimeout(currentThread);
    this.setState(
      {
        fadeAnim: new Animated.Value(0),
        transAnim: new Animated.Value(0),
      },
      () => {
        this.setState({ errorMessage: message, state: _state[state] }, () => {
          const delayTime = 0;
          Animated.parallel([
            Animated.timing(this.state.fadeAnim, {
              toValue: 1,
              duration: 500,
              delay: delayTime,
              useNativeDriver: true,
            }),
            Animated.timing(this.state.transAnim, {
              toValue: -calcHeight(isKeybordOpend ? 400 : 130),
              duration: 300,
              delay: delayTime,
              useNativeDriver: true,
            }),
          ]).start(() => {
            currentThread = setTimeout(this.close, 3000);
          });
        });
      },
    );
  };
  close = () => {
    Animated.parallel([
      Animated.timing(this.state.fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.transAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      this.setState({
        transAnim: new Animated.Value(0),
      });
    });
  };
  render() {
    return (
      <Animated.View
        style={{
          transform: [{ translateY: this.state.transAnim }],
          position: 'absolute',
          bottom: -calcHeight(50),
          zIndex: 5,
          opacity: this.state.fadeAnim,
          width: calcWidth(375),
          height: calcHeight(50),
          backgroundColor: 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={[
            styles.contentContainer(this.state.state),
            {
              height: calcHeight(42),
              flexDirection: 'row',
            },
          ]}
        >
          {/* <SvgIcon color={'white'} name={this.state.state} width={calcWidth(17)} height={calcWidth(17)} /> */}
          <Text style={styles.toastText}>{this.state.errorMessage} </Text>
        </View>
      </Animated.View>
    );
  }
}
