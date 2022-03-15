import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

import AppButton from "./AppButton";
import AppText from "./AppText";
import Colors from "../constants/Colors";

const ImagePickerContainer = ({ onImageTaken }) => {
  const [pickedImage, setPickedImage] = useState(null);
  const imagePickerHandler = async () => {
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImage(image.uri);
    onImageTaken(image.uri);
  };

  return (
    <View style={styles.root}>
      <View style={styles.imageInput}>
        <AppText>Image</AppText>
        <AppButton
          buttonStyle={styles.buttonStyle}
          textStyle={styles.textStyle}
          onPress={imagePickerHandler}
        >
          Please Choose Image
        </AppButton>
        {pickedImage && (
          <View style={styles.imagePreview}>
            <Image style={styles.image} source={{ uri: pickedImage }} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
  imagePreview: {
    height: 200,
    marginTop: 20,
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 3,
  },
  buttonStyle: {
    backgroundColor: Colors.basic,
    marginTop: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  textStyle: {
    color: Colors.primary,
    fontWeight: "bold",
    textAlign: "center",
  },
  imageInput: {
    marginTop: 20,
  },
});

export default ImagePickerContainer;
