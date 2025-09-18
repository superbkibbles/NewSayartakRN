import React from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback, Animated, ViewProps } from 'react-native';

interface TouchableScaleProps {
  defaultScale?: number;
  activeScale?: number;
  tension?: number;
  friction?: number;
  pressInTension?: number;
  pressInFriction?: number;
  pressOutTension?: number;
  pressOutFriction?: number;
  useNativeDriver?: boolean;
  onPress?: () => void;
  onPressIn?: (...args: any[]) => void;
  onPressOut?: (...args: any[]) => void;
  children?: React.ReactNode;
  style?: any;
}

interface TouchableScaleState {}

export default class TouchableScale extends React.Component<
  TouchableScaleProps,
  TouchableScaleState
> {
  scaleAnimation: Animated.Value;
  static defaultProps: {
    defaultScale: number;
    activeScale: number;
    tension: number;
    friction: number;
    useNativeDriver: boolean;
  };
  constructor(props: TouchableScaleProps) {
    super(props);
    /** @type {TouchableScaleProps} */

    this.onPressIn = this.onPressIn.bind(this);
    this.onPressOut = this.onPressOut.bind(this);
    this.scaleAnimation = new Animated.Value(props.defaultScale || 1);
  }

  render() {
    /** @type {TouchableScaleProps} */
    const props = this.props;

    return (
      <TouchableWithoutFeedback
        // todo: pass only TouchableWithoutFeedback's props.
        {...props}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
      >
        <Animated.View
          style={[
            props.style,
            {
              transform: [{ scale: this.scaleAnimation }],
            },
          ]}
        >
          {props.children}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }

  onPressIn(...args: any[]) {
    /** @type {TouchableScaleProps} */
    const props = this.props;
    const tension =
      typeof props.pressInTension !== 'undefined'
        ? props.pressInTension
        : props.tension;
    const friction =
      typeof props.pressInFriction !== 'undefined'
        ? props.pressInFriction
        : props.friction;

    Animated.spring(this.scaleAnimation, {
      toValue: props.activeScale || 0.95,
      tension: tension,
      friction: friction,
      useNativeDriver: props.useNativeDriver || false,
    }).start();

    if (props.onPressIn) {
      props.onPressIn(...args);
    }
  }

  onPressOut(...args: any[]) {
    /** @type {TouchableScaleProps} */
    const props = this.props;
    const tension =
      typeof props.pressOutTension !== 'undefined'
        ? props.pressOutTension
        : props.tension;
    const friction =
      typeof props.pressOutFriction !== 'undefined'
        ? props.pressOutFriction
        : props.friction;

    Animated.spring(this.scaleAnimation, {
      toValue: props.defaultScale || 1,
      tension: tension,
      friction: friction,
      useNativeDriver: props.useNativeDriver || false,
    }).start();

    if (props.onPressOut) {
      props.onPressOut(...args);
    }
  }
}

TouchableScale.propTypes = {
  ...TouchableWithoutFeedback.propTypes,
  //   style: ViewProps.style,
  defaultScale: PropTypes.number.isRequired,
  activeScale: PropTypes.number.isRequired,
  tension: PropTypes.number.isRequired,
  friction: PropTypes.number.isRequired,
  pressInTension: PropTypes.number,
  pressInFriction: PropTypes.number,
  pressOutTension: PropTypes.number,
  pressOutFriction: PropTypes.number,
  useNativeDriver: PropTypes.bool,
};

TouchableScale.defaultProps = {
  defaultScale: 1,
  activeScale: 0.9,
  tension: 150,
  friction: 3,
  useNativeDriver: true,
};
