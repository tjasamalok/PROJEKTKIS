import React, { useState, useCallback, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet } from "react-native";
import AppButton from "../components/AppButton";
import Colors from "../constants/Colors";

const MapScreen = (props) => {
  const readonly = props.navigation.getParam("readonly");
  const initialLocation = props.navigation.getParam("initialLocation");

  const [selectedLocation, setSelectedLocation] = useState({
    latitude: initialLocation ? initialLocation.latitude : 46.559117,
    longitude: initialLocation ? initialLocation.longitude : 15.638076,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const selectLocationHandler = (event) => {
    if (readonly) {
      return;
    }
    setSelectedLocation({
      ...selectedLocation,
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  let markerCoordinate;
  if (selectedLocation) {
    markerCoordinate = {
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    };
  }

  const saveLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      return;
    }
    props.navigation.navigate("NewPlace", {
      locationDetails: selectedLocation,
    });
  }, [selectedLocation]);

  useEffect(() => {
    props.navigation.setParams({ saveLocation: saveLocationHandler });
  }, [saveLocationHandler]);

  return (
    <MapView
      region={selectedLocation}
      style={styles.screen}
      onPress={selectLocationHandler}
    >
      {markerCoordinate && (
        <Marker title="Tukaj" coordinate={markerCoordinate}></Marker>
      )}
    </MapView>
  );
};

MapScreen.navigationOptions = (navData) => {
  const saveLocation = navData.navigation.getParam("saveLocation");
  const readonly = navData.navigation.getParam("readonly");
  if (readonly) {
    return {};
  }
  return {
    headerRight: () => (
      <AppButton
        onPress={saveLocation}
        buttonStyle={styles.buttonStyle}
        textStyle={styles.textStyle}
      >
        Save
      </AppButton>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  buttonStyle: {
    marginRight: 20,
  },
  textStyle: {
    fontWeight: "bold",
    color: Colors.primary,
  },
});

export default MapScreen;
