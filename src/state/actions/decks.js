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

export const getAllDecks = () => async dispatch => {
  try {
    console.log("decks");
    const response = await axiosWithAuth().get("/decks");
    dispatch({
      type: types.READ_DECK,
      payload: response.data.data,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deleteDeck = id => async dispatch => {
  try {
    const response = await axiosWithAuth().delete("/decks/" + id);
    dispatch({
      type: types.DELETE_DECK,
      payload: id,
    });
  } catch (err) {
    throw err;
  }
};

export const getDeckById = id => async dispatch => {
  try {
    const response = await axiosWithAuth().get("/decks/" + id);
    dispatch({
      type: types.GET_DECK_BY_ID,
      payload: response.data.deck,
    });
  } catch (err) {
    throw err;
  }
};

export const editCurrentDeck = id => {
  axiosWithAuth().get("/decks" + id);
};
