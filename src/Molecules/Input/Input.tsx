import React, { useRef, useState, useEffect } from 'react';
import { config } from '../../config/appConfig';
import {
  TextInput,
  KeyboardTypeOptions,
  ImageSourcePropType,
  ImageResizeMode,
  TextStyle,
  StyleProp,
  TouchableOpacity,
  Text,
} from 'react-native';
import { calcHeight, calcWidth } from '../../config/metrics';
import { RFValue } from 'react-native-responsive-fontsize';
import { Text_ } from '../Text/Text';
import { Icons } from '../../config/icons';
import { Button } from '../../components';
import { fixNumbers } from '../../utils/datesUtils';

type InputProps = {
  style?: StyleProp<TextStyle>;
  source?: ImageSourcePropType;
  resizeMode: ImageResizeMode;
  placeholder: String;
  label: String;
  value: String;
  multiline: Boolean;
  isCard: Boolean;
  keyboardType?: KeyboardTypeOptions;
  onChangeText: Function;
  editable: Boolean;
  secureTextEntry: Boolean;
  phone: Boolean;
  maxLength: Number;
  autoFocus: Boolean;
  isFocus: Boolean;
  caretHidden: Boolean;
  returnKeyType: String;
};
export function Input(params: InputProps) {
  let input = useRef(null);
  useEffect(() => {
    input.current.setNativeProps({
      style: {
        fontFamily: config.fonts.light,
      },
    });
    if (params.isFocus) {
      input.current.focus();
    }
  }, [params.isFocus]);

  return (
    <TextInput
      numberOfLines={params.numberOfLines}
      autoCorrect={false}
      caretHidden={params.caretHidden}
      ref={input}
      autoFocus={params.autoFocus}
      // returnKeyType={params.returnKeyType || "done"}
      secureTextEntry={params.secureTextEntry}
      editable={params.editable}
      maxLength={params.maxLength}
      onChangeText={params.onChangeText}
      value={params.value}
      keyboardType={params.keyboardType}
      placeholderTextColor={'gray'}
      placeholder={params.placeholder}
      style={[
        {
          width: '40%',
          height: '100%',
          // backgroundColor: "red",
          padding: 0,
          margin: 0,
          textAlign: 'center',
          fontFamily: config.fonts.light,

          fontSize: RFValue(15, 812),
        },
        params.style,
      ]}
    />
  );
}

export function InputWithLabel(params: InputProps) {
  const [isShowPassword, setShowPassword] = useState(params.secureTextEntry);
  const _setShowPassword = () => {
    setShowPassword(!isShowPassword);
  };
  let input = useRef(null);
  useEffect(() => {
    input.current.setNativeProps({
      style: {
        fontFamily: config.fonts.light,
      },
    });
    if (params.isFocus) {
      input.current.focus();
    }
  }, [params.isFocus]);

  useEffect(() => {}, [isShowPassword]);

  return (
    <TouchableOpacity
      disabled={params.editable === false}
      activeOpacity={1}
      onPress={() => {
        input.current.focus();
      }}
      style={[
        {
          opacity: params.editable === false ? 0.6 : 1,
          width: calcWidth(355),
          paddingHorizontal: calcWidth(15),
          backgroundColor: config.colors.WHITE,
          borderWidth: 1,
          borderColor: config.colors.BORDER_COLOR,
          borderRadius: RFValue(5),
          alignItems: 'flex-start',
          height: calcHeight(60),
          marginTop: calcHeight(10),
          paddingTop: calcHeight(10),
        },
        params.style,
      ]}
    >
      <Text_ fontSize={'14'} fontFamily={'medium'}>
        {params.label}
      </Text_>
      <TextInput
        placeholderTextColor={'gray'}
        numberOfLines={params.numberOfLines}
        autoCorrect={false}
        returnKeyType={params.returnKeyType || 'done'}
        maxLength={params.maxLength}
        secureTextEntry={isShowPassword}
        editable={params.editable}
        onChangeText={params.onChangeText}
        keyboardType={params.phone ? 'phone-pad' : params.keyboardType}
        ref={input}
        multiline={params.multiline}
        value={fixNumbers(params.value)}
        style={{
          width: '100%',
          textAlign: 'right',
          //  backgroundColor:"red",
          //  lineHeight:30,
          fontFamily: config.fonts.light,
          fontSize: RFValue(14, 812),
          paddingVertical: calcHeight(5),
          lineHeight: RFValue(14 * 1.1, 812),
          //  backgroundColor:"red",
          margin: 0,
          paddingBottom: 0,
          height:
            params.style && params.style.height
              ? params.style.height
              : RFValue(22, 812),
        }}
        placeholder={params.placeholder}
      />
      {params.isCard ||
        (params.phone && (
          <Icons
            style={{
              position: 'absolute',
              height: '100%',
              justifyContent: 'center',
              right: params.phone ? calcWidth(15) : 0,
              top: params.phone ? calcHeight(12) : calcHeight(5),
            }}
            name={params.phone ? 'iraqFlag' : 'masterCard'}
            width={RFValue(params.phone ? 30 : 50, 812)}
            height={RFValue(params.phone ? 25 : 30, 812)}
          />
        ))}
      {params.phone && (
        <Text
          style={{
            position: 'absolute',
            right: calcWidth(55),
            fontFamily: null,
            fontWeight: '700',
            top: calcHeight(29),
            color: config.colors.rgbaBlack(0.7),
            fontSize: RFValue(15, 812),
          }}
        >
          {'+964'}
        </Text>
      )}
      {params.secureTextEntry && (
        <Button
          onPress={_setShowPassword}
          iconStyle={{
            color: config.colors.GRAY,
            width: RFValue(25, 812),
            height: RFValue(19, 812),
          }}
          iconName={isShowPassword ? 'eye' : 'eyeOf'}
          style={{
            position: 'absolute',
            height: '100%',
            justifyContent: 'center',
            right: 0,
            top: calcHeight(29),
            paddingHorizontal: calcWidth(15),
          }}
        />
      )}
    </TouchableOpacity>
  );
}
