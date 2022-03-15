import React from "react";
import { TextInput, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const AppInput = ({ style, onTextInput, value }) => {
  return (
    <TextInput
      style={{ ...styles.root, ...style }}
      onChangeText={onTextInput}
      value={value}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    borderColor: Colors.primary,
    fontSize: 16,
    borderRadius: 3,
    padding: 5,
  },
});

export default AppInput;
