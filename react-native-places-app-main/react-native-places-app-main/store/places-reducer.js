import Place from "../models/Place";
import { ADD_PLACE, DELETE_PLACE, SET_PLACES } from "./places-action";

const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACES:
      return {
        places: action.places.map(
          (place) =>
            new Place(
              place.id.toString(),
              place.title,
              place.imageUri,
              place.address,
              place.lat,
              place.lng
            )
        ),
      };
    case ADD_PLACE:
      const newPlace = new Place(
        action.placeDetails.id.toString(),
        action.placeDetails.title,
        action.placeDetails.image,
        action.placeDetails.address,
        action.placeDetails.coords.latitude,
        action.placeDetails.coords.longitude
      );
      return {
        places: [...state.places, newPlace],
      };
    case DELETE_PLACE:
      return {
        places: state.places.filter((place) => place.id !== action.id),
      };
    default:
      return state;
  }
};
