import React from "react";
import { Text, StyleSheet } from "react-native";

const AppText = ({ style, children }) => {
  return <Text style={{ ...styles.root, ...style }}>{children}</Text>;
};

const styles = StyleSheet.create({
  root: {
    fontSize: 16,
  },
});

export default AppText;
