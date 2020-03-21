import {
  CLEAR_DECK_IN_SESSION,
  SET_DECK_IN_SESSION,
  GET_PUBLIC_DECKS,
  GET_PERSONAL_DECKS,
  READ_DECK,
  DELETE_DECK,
  GET_DECK_BY_ID,
  CREATE_DECK,
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
    throw error;
  }
};

export const getPublicDecks = () => async dispatch => {
  try {
    const response = await axiosWithAuth().get("/decks/public");
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
    dispatch({
      type: GET_PERSONAL_DECKS,
      payload: response.data.data,
    });
  } catch (err) {
    throw err;
  }
};

export const getAllDecks = () => async dispatch => {
  try {
    const response = await axiosWithAuth().get("/decks");
    dispatch({
      type: READ_DECK,
      payload: response.data.data,
    });
  } catch (err) {
    throw err;
  }
};

export const deleteDeck = id => async dispatch => {
  try {
    await axiosWithAuth().delete("/decks/" + id);
    dispatch({
      type: DELETE_DECK,
      payload: id,
    });
  } catch (err) {
    throw err;
  }
};

export const createDeck = payload => async dispatch => {
  try {
    const response = await axiosWithAuth().post(`/decks`, payload);
    dispatch({
      type: CREATE_DECK,
      payload: response.data.deck,
    });
  } catch (err) {
    throw err;
  }
};

export const getDeckById = id => async dispatch => {
  try {
    const response = await axiosWithAuth().get("/decks/" + id);
    dispatch({
      type: GET_DECK_BY_ID,
      payload: response.data.deck,
    });
  } catch (err) {
    throw err;
  }
};

export const editCurrentDeck = id => {
  axiosWithAuth().get("/decks" + id);
};
