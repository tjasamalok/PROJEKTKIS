import * as FileSystem from "expo-file-system";
import { deletePlace, fetchPlaces, insertPlace } from "../helpers/db";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";
export const DELETE_PLACE = "DELETE_PLACE";

export const removePlace = (id) => {
  return async (dispatch) => {
    const result = await deletePlace(id);
    dispatch({
      type: DELETE_PLACE,
      id: id,
    });
  };
};

export const setPlaces = () => {
  return async (dispatch) => {
    try {
      const result = await fetchPlaces();
      dispatch({ type: SET_PLACES, places: result.rows._array });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addPlace = (title, imageUri, location) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=AIzaSyDQTB69Plzx-lmaWrLxxY7UaKLGoCRAT9Q`
    );

    if (!response.ok) {
      throw new Error("Error.");
    }

    const resData = await response.json();
    if (!resData.results) {
      throw new Error("Error.");
    }

    const address = resData.results[0].formatted_address;

    const fileName = imageUri.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: imageUri,
        to: newPath,
      });
      const dbInsert = await insertPlace(
        title,
        newPath,
        address,
        location.latitude,
        location.longitude
      );
      console.log("dodano", dbInsert);
      dispatch({
        type: ADD_PLACE,
        placeDetails: {
          id: dbInsert.insertId,
          title: title,
          image: newPath,
          address: address,
          coords: location,
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
