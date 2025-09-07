import * as React from 'react'
import Svg, {
  G,
  Path,
  Circle,
  Defs,
  ClipPath,
  RadialGradient,
  LinearGradient,
  Stop,
  Ellipse,
  Image,
  Polygon,
  Rect,
  Mask,
  Use,
  Pattern,
} from 'react-native-svg'

const Icons = {

}

type SvgIconProps = {
  name: String,
  size: Number,
  color: Colors,
  rotate: Boolean,
  width: Number,
  height: Number
}

export function SvgIcon(props: SvgIconProps) {
  return Icons[props.name]({ width: props.width, height: props.height, fill: props.color, rotate: props.rotate })
}