import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import PlacesListScreen from "../screens/PlacesListScreen";
import PlaceDetailsScreen from "../screens/PlaceDetailsScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import MapScreen from "../screens/MapScreen";

const PlacesNavigator = createStackNavigator({
  Places: PlacesListScreen,
  PlaceDetails: PlaceDetailsScreen,
  NewPlace: NewPlaceScreen,
  Map: MapScreen,
});

export default createAppContainer(PlacesNavigator);
