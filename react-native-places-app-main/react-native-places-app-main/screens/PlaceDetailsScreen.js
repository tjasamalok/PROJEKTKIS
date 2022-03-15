import React, { useEffect, useCallback } from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableNativeFeedback,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButtons from "../components/CustomHeaderButtons";
import { useSelector, useDispatch } from "react-redux";
import AppText from "../components/AppText";
import Colors from "../constants/Colors";
import MapPreview from "../components/MapPreview";
import { removePlace } from "../store/places-action";

const PlaceDetailsScreen = (props) => {
  const dispatch = useDispatch();

  const placeId = props.navigation.getParam("placeId");
  const placeDetails = useSelector((state) =>
    state.places.places.find((place) => place.id === placeId)
  );
  console.log("podrobnosti place-a", placeDetails);

  const deletePlaceHandler = useCallback(() => {
    Alert.alert("?", "Are you sure you want to delete this place.", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(removePlace(placeId));
          props.navigation.goBack();
        },
      },
    ]);
  }, [dispatch]);

  useEffect(() => {
    props.navigation.setParams({ deletePlace: deletePlaceHandler });
  }, [deletePlaceHandler]);

  const mapPreviewHandler = () => {
    props.navigation.navigate("Map", {
      readonly: true,
      initialLocation: {
        latitude: placeDetails.latitude,
        longitude: placeDetails.longitude,
      },
    });
  };

  return (
    <ScrollView>
      {placeDetails && (
        <View style={styles.screen}>
          <Image source={{ uri: placeDetails.imageUri }} style={styles.image} />
          <View style={styles.address}>
            <AppText style={styles.text}>{placeDetails.address}</AppText>
          </View>
          <TouchableNativeFeedback
            onPress={mapPreviewHandler}
            useForeground={true}
          >
            <View style={styles.mapPreview}>
              <MapPreview
                latitude={placeDetails.latitude}
                longitude={placeDetails.longitude}
              />
            </View>
          </TouchableNativeFeedback>
        </View>
      )}
    </ScrollView>
  );
};

PlaceDetailsScreen.navigationOptions = (navData) => {
  const deletePlace = navData.navigation.getParam("deletePlace");
  return {
    headerTitle: navData.navigation.getParam("placeTitle"),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButtons}>
        <Item title="delete" iconName="trash-outline" onPress={deletePlace} />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginHorizontal: 10,
  },
  image: {
    height: 200,
    borderRadius: 3,
    marginTop: 20,
  },

  mapPreview: {
    marginTop: 20,
    borderRadius: 3,
    overflow: "hidden",
    height: 200,
  },
  address: {
    marginTop: 20,
    padding: 5,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 3,
    paddingVertical: 5,
  },
  text: {
    textAlign: "center",
  },
});

export default PlaceDetailsScreen;
