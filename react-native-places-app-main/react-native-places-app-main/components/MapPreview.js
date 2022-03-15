import React from "react";
import { Image, StyleSheet } from "react-native";

const MapPreview = ({ latitude, longitude }) => {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=13&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${latitude},${longitude}&key=AIzaSyDQTB69Plzx-lmaWrLxxY7UaKLGoCRAT9Q`;
  console.log(imagePreviewUrl);
  return <Image source={{ uri: imagePreviewUrl }} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 3,
  },
});

export default MapPreview;
