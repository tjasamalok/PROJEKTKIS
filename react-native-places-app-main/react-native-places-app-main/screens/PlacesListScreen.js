import React, { useEffect } from "react";
import { FlatList, StyleSheet, View, Image } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import AppText from "../components/AppText";

import CustomHeaderButtons from "../components/CustomHeaderButtons";
import PlaceItem from "../components/PlaceItem";
import { setPlaces } from "../store/places-action";

const PlacesListScreen = (props) => {
  const placesList = useSelector((state) => state.places.places);

  console.log("seznam place-ev", placesList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPlaces());
  }, [dispatch]);

  return (
    <View>
      {placesList.length === 0 && (
        <View style={styles.emptyPlace}>
          <Image source={require("../assets/place.png")} style={styles.image} />
          <AppText style={styles.text}>
            No places found, Start Adding Some
          </AppText>
        </View>
      )}
      <FlatList
        data={placesList}
        renderItem={(itemData) => (
          <PlaceItem
            onPress={() => {
              props.navigation.navigate("PlaceDetails", {
                placeTitle: itemData.item.title,
                placeId: itemData.item.id,
              });
            }}
            title={itemData.item.title}
            address={itemData.item.address}
            image={itemData.item.imageUri}
          />
        )}
      />
    </View>
  );
};

PlacesListScreen.navigationOptions = (navData) => {
  return {
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButtons}>
        <Item
          title="Add"
          iconName="md-add"
          onPress={() => {
            navData.navigation.navigate("NewPlace");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  emptyPlace: {
    marginTop: "50%",
  },
  text: {
    textAlign: "center",
  },
  image: {
    height: 200,
    width: "100%",
  },
});

export default PlacesListScreen;
