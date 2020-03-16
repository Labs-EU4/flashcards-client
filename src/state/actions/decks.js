import {
  CLEAR_DECK_IN_SESSION,
  SET_DECK_IN_SESSION,
  GET_PUBLIC_DECKS,
  GET_PERSONAL_DECKS,
} from "../types";
import {axiosWithAuth} from "../../utils/axios";

const action = (type, payload = null) => {
  if (payload) return {type, payload};
  return {type};
};

export const clearDeckInPlaySession = () => dispatch => {
  dispatch(action(CLEAR_DECK_IN_SESSION));
};

export const storeUnfinishedSession = sessionData => dispatch => {
  localStorage.setItem("unfinished_session", JSON.stringify(sessionData));
  dispatch(action(CLEAR_DECK_IN_SESSION));
};

export const fetchDeckById = deckId => async dispatch => {
  try {
    const response = await axiosWithAuth().get(`/decks/${deckId}`);
    const {deck} = response.data;
    dispatch(action(SET_DECK_IN_SESSION, deck));
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getPublicDecks = () => async dispatch => {
  try {
    const response = await axiosWithAuth().get("/decks/public");
    console.log("public", response);
    dispatch({
      type: GET_PUBLIC_DECKS,
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
      type: GET_PERSONAL_DECKS,
      payload: response.data.data,
    });
  } catch (err) {
    throw err;
  }
};
