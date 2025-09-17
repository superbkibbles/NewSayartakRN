


import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, Animated, Easing } from 'react-native';
import { calcHeight } from '../../config/metrics';
import { Icons } from '../../config/icons';
import styles from './styles';
import { config } from '../../config/appConfig';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';

function TabBottomComponent({ state, descriptors, navigation }) {
    let token = useSelector((state) => state.presistReducer.token)

    return (
        <View style={{ flexDirection: 'row', height: calcHeight(70), elevation: 10, borderWidth: 1, borderColor: config.colors.rgbaBlack(.08), alignItems: "center", justifyContent: "center", overflow: "hidden", backgroundColor: "white", }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;
                const isFocused = state.index === index;
                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });
                    if (index === 2) {
                        if (token)
                            navigation.navigate(route.name);
                        else
                            navigation.navigate("SignIn");
                    }
                    else
                        navigation.navigate(route.name);
                };
                return (
                    <Item route={route} isFocused={isFocused} label={label} onPress={onPress} />
                );
            })}

        </View>
    );
}


function Item({ route, isFocused, label, onPress }) {
    const Button = Animated.createAnimatedComponent(TouchableOpacity)
    let rotateAnimation = useRef(new Animated.Value(0)).current
    let _onPress = () => {
        onPress()
        // Animated.timing(rotateAnimation, {
        //     toValue: rotateAnimation._value === 1 ? 0 : 1,
        //     duration: 1000,
        //     easing: Easing.elastic()
        // }).start()
    }

    let rotate = rotateAnimation.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] })
    // let color = rotateAnimation.interpolate({ inputRange: [0, 1], outputRange: [config.colors.GRAY, config.colors.BASE_COLOR] })
    return (
        <Button
            activeOpacity={1}
            key={route.key}
            onPress={_onPress}
            notes

            style={[styles.buttonItem, { transform: [{ rotateY: rotate }] }]}
        >
            <Icons
                color={isFocused ? config.colors.BASE_COLOR : config.colors.GRAY}
                name={label}
                width={RFValue(27, 812)}
                height={RFValue(23, 812)} />
            <Text style={{
                color: isFocused ? config.colors.BASE_COLOR : config.colors.gray,
                fontFamily: isFocused ? config.fonts.bold : config.fonts.light,
                fontSize: RFValue(10, 812),
                marginTop: 3
            }}>
                {route.params.name}
            </Text>

        </Button>
    )
}

export { TabBottomComponent }
