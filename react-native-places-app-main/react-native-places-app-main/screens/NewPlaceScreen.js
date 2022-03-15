import React, { useState, useCallback, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";
import AppText from "../components/AppText";
import ImagePickerContainer from "../components/ImagePickerContainer";
import LocationPicker from "../components/LocationPicker";
import Colors from "../constants/Colors";
import { addPlace } from "../store/places-action";

const NewPlaceScreen = (props) => {
  const [title, setTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState();

  const dispatch = useDispatch();

  const titleInputHandler = (text) => {
    setTitle(text);
  };

  const savePlaceHandler = () => {
    dispatch(addPlace(title, selectedImage, selectedLocation));
    props.navigation.goBack();
  };

  const selectedImageHandler = (imageUri) => {
    setSelectedImage(imageUri);
  };

  const selectedLocationHandler = useCallback((location) => {
    setSelectedLocation(location);
  }, []);

  return (
    <ScrollView>
      <View style={styles.root}>
        <AppText>Title</AppText>
        <AppInput
          style={styles.input}
          onTextInput={titleInputHandler}
          value={title}
        />
        <ImagePickerContainer onImageTaken={selectedImageHandler} />
        <LocationPicker
          navigation={props.navigation}
          onLocationSelected={selectedLocationHandler}
        />
        <AppButton
          buttonStyle={styles.buttonStyle}
          textStyle={styles.textStyle}
          onPress={savePlaceHandler}
        >
          Save Place
        </AppButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    margin: 10,
  },
  input: {
    marginTop: 10,
  },
  buttonStyle: {
    width: 100,
    elevation: 1,
    marginTop: 50,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: Colors.basic,
  },
  textStyle: {
    fontWeight: "bold",
  },
});

NewPlaceScreen.navigationOptions = {
  headerTitle: "Add New Place",
};

export default NewPlaceScreen;
