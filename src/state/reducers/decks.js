import {
  CLEAR_DECK_IN_SESSION,
  SET_DECK_IN_SESSION,
  GET_PUBLIC_DECKS,
  GET_PERSONAL_DECKS,
} from "../types";
import {combineReducers} from "redux";
const initialPlayModeState = null;
export const playModeReducer = (state = initialPlayModeState, action) => {
  switch (action.type) {
    case CLEAR_DECK_IN_SESSION:
      return null;
    case SET_DECK_IN_SESSION:
      return action.payload;
    default:
      return state;
  }
};
const initialDecks = [];

export function publicDecksReducer(state = initialDecks, action) {
  switch (action.type) {
    case GET_PUBLIC_DECKS:
      return action.payload;
    default:
      return state;
  }
}

export function personalDecksReducer(state = initialDecks, action) {
  switch (action.type) {
    case GET_PERSONAL_DECKS:
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  deckInPlaySession: playModeReducer,
  publicDeckState: publicDecksReducer,
  personalDeckState: personalDecksReducer,
});
