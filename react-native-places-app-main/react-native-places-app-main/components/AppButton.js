import React from "react";
import { View, TouchableNativeFeedback, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import AppText from "./AppText";

const AppButton = ({ buttonStyle, textStyle, children, onPress }) => {
  return (
    <View style={{ ...styles.root, ...buttonStyle }}>
      <TouchableNativeFeedback onPress={onPress}>
        <View style={styles.rootWrapper}>
          <AppText style={{ ...textStyle }}>{children}</AppText>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  rootWrapper: {
    padding: 10,
  },
  root: {
    borderRadius: 3,
    overflow: "hidden",
  },
});

export default AppButton;
