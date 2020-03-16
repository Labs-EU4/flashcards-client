import {axiosWithAuth} from "../../utils/axios";
import * as types from "../types";

export const getPublicDecks = () => async dispatch => {
  try {
    const response = await axiosWithAuth().get("/decks/public");
    console.log("public", response);
    dispatch({
      type: types.GET_PUBLIC_DECKS,
      payload: response.data.data,
    });
  } catch (err) {
    throw err;
  }
};

export const getPersonalDecks = () => async dispatch => {
  try {
    const response = await axiosWithAuth().get("/decks");
    console.log("personal", response);

    dispatch({
      type: types.GET_PERSONAL_DECKS,
      payload: response.data.data,
    });
  } catch (err) {
    throw err;
  }
};
