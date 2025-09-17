import React from "react";
import { StyleSheet, View } from "react-native";
import { calcWidth } from "../../config/metrics";
export const Bar = ({ barStyle }) => {
  return (
    <View style={BarStyles.barContainer}>
      <View style={[BarStyles.bar, barStyle]} />
    </View>
  );
};

const BarStyles = StyleSheet.create({
  barContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  bar: {
    width: calcWidth(50),
    height: 4,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#E3E3E3",
  },
});
