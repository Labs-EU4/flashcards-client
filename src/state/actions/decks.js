import {
  CLEAR_DECK_IN_SESSION,
  SET_DECK_IN_SESSION,
  GET_PUBLIC_DECKS,
  GET_PERSONAL_DECKS,
  READ_DECK,
  DELETE_DECK,
  GET_DECK_BY_ID,
  UPDATE_DECK,
  CREATE_DECK,
  GET_RECENT_START,
  GET_RECENT_SUCCESS,
  GET_RECENT_FAILURE,
  TOUCH_DECK_FAILURE,
  TOUCH_DECK_START,
  TOUCH_DECK_SUCCESS,
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

export const getAllPersonalDecks = () => async dispatch => {
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
    console.log(err);
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
    return response;
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

export const updateDeck = (id, deck) => async dispatch => {
  try {
    const response = await axiosWithAuth().put("/decks/" + id, deck);
    dispatch({
      type: UPDATE_DECK,
      payload: response.data,
    });
  } catch (err) {
    throw err;
  }
};

export const getRecentDecks = () => async dispatch => {
  try {
    dispatch(action(GET_RECENT_START));
    const response = await axiosWithAuth().get("/decks/access");
    const recentDecks = response.data.data;
    dispatch(action(GET_RECENT_SUCCESS, recentDecks));
  } catch (error) {
    dispatch(action(GET_RECENT_FAILURE));
    throw error;
  }
};

export const touchDeck = deck => async dispatch => {
  try {
    dispatch(action(TOUCH_DECK_START));
    await axiosWithAuth().put(`/decks/access/${deck.deck_id}`);
    dispatch(action(TOUCH_DECK_SUCCESS, deck));
  } catch (error) {
    dispatch(action(TOUCH_DECK_FAILURE));
  }
};
