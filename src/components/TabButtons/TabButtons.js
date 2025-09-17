import React, { useState } from 'react'
import { View, FlatList, StyleProp, ViewStyle } from 'react-native'
import { calcHeight, calcWidth } from '../../config/metrics'
import { Button } from '../index'
import styles from './styles'
import { Line } from '../../Molecules'


type TabButtonsProps = {
    style?: StyleProp<ViewStyle>,
    items: Array
}

export function TabButtons(params: TabButtonsProps) {
    let [isSelected, setSelectedIndex] = useState(params.selectedTab||0)
    let flatListProps = {
        style: { height: "100%" },
        contentContainerStyle: { justifyContent: "center" },
        scrollEnabled: false,
        horizontal: true,
        data: params.items,
        renderItem: ({ item, index }) => {
            let isSelecte = isSelected === index
            return (
                <Button
                    onPress={() => {
                        item.onPress()
                        setSelectedIndex(index)
                    }}
                    textStyle={isSelecte && styles.selectButtonStyle}
                    text={item.title}
                    style={[
                        styles.buttonStyles,
                        { width: calcWidth(335) / params.items.length }]}
                />
            )
        },
        ItemSeparatorComponent: () => {
            return (
                <View style={{ height: "100%", justifyContent: "center" }}>
                    <Line verticalLine size={calcHeight(28)} />
                </View>

            )
        }
    }
    return (
        <View style={[styles.container, params.style]}>
            <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
                {...flatListProps}
            />
        </View>
    )
}