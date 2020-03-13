import {CLEAR_DECK_IN_SESSION, GET_DECKS_DATA} from "../types";
import {combineReducers} from "redux";
const initialPlayModeState = null;
export const playModeReducer = (state = initialPlayModeState, action) => {
  switch (action.type) {
    case CLEAR_DECK_IN_SESSION:
      return null;

    default:
      return state;
  }
};
export const initialDecks = [];

export function decksReducer(state = initialDecks, action) {
  switch (action.type) {
    case GET_DECKS_DATA:
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  deckInPlaySession: playModeReducer,
});
