import React from "react";
import { View, Image, TouchableNativeFeedback, StyleSheet } from "react-native";

import Colors from "../constants/Colors";
import AppText from "./AppText";

const PlaceItem = ({ onPress, image, title, address }) => {
  return (
    <View style={styles.root}>
      <TouchableNativeFeedback onPress={onPress}>
        <View style={styles.content}>
          <Image source={{ uri: image }} style={styles.image} />
          <View style={styles.details}>
            <AppText>{title}</AppText>
            <AppText>{address}</AppText>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: 100,
    backgroundColor: Colors.basic,
    margin: 10,
    borderRadius: 3,
    elevation: 1,
    overflow: "hidden",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    margin: 10,
    backgroundColor: Colors.fallback,
    borderRadius: 50,
  },
  details: {},
});

export default PlaceItem;
