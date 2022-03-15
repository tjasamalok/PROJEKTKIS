import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import * as Location from "expo-location";

import AppButton from "./AppButton";
import AppText from "./AppText";
import Colors from "../constants/Colors";
import MapPreview from "./MapPreview";

const LocationPicker = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);

  const mapPickedLocation = props.navigation.getParam("locationDetails");

  const { onLocationSelected } = props;

  useEffect(() => {
    if (mapPickedLocation) {
      setCurrentLocation(mapPickedLocation);
      onLocationSelected(mapPickedLocation);
    }
  }, [mapPickedLocation, onLocationSelected]);

  const locationPickerHandler = async () => {
    setIsLoading(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission denied");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      onLocationSelected({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const mapLocationPickerHandler = () => {
    props.navigation.navigate("Map");
  };

  return (
    <View style={styles.root}>
      <View style={styles.locationInput}>
        <AppText>Location</AppText>
        <View style={styles.locationsButton}>
          <AppButton
            buttonStyle={styles.buttonStyle}
            textStyle={styles.textStyle}
            onPress={locationPickerHandler}
          >
            {isLoading ? (
              <ActivityIndicator color={Colors.primary} />
            ) : (
              "Get Current Location"
            )}
          </AppButton>
          <AppText>Or</AppText>
          <AppButton
            buttonStyle={styles.buttonStyle}
            textStyle={styles.textStyle}
            onPress={mapLocationPickerHandler}
          >
            Choose From Map
          </AppButton>
        </View>
        {currentLocation && (
          <View style={styles.locationPreview}>
            <MapPreview
              latitude={currentLocation.latitude}
              longitude={currentLocation.longitude}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
  locationPreview: {
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
    width: "45%",
  },
  textStyle: {
    color: Colors.primary,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },
  locationInput: {
    marginTop: 20,
  },
  locationsButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default LocationPicker;
