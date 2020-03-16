import {CLEAR_DECK_IN_SESSION, GET_DECKS_DATA, SET_DECK_IN_SESSION} from "../types";
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

export const getDecks = requestAddr => async dispatch => {
  try {
    const response = await axiosWithAuth().get(requestAddr);
    dispatch({
      type: GET_DECKS_DATA,
      payload: response.data.data,
    });
  } catch (err) {
    throw err;
  }
};
