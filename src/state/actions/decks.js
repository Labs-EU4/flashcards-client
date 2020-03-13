import {CLEAR_DECK_IN_SESSION, GET_DECKS_DATA} from "../types";
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
