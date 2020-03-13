import {CLEAR_DECK_IN_SESSION, GET_DECKS_DATA} from "../types";

export const playModeReducer = (state, action) => {
  switch (action.type) {
    case CLEAR_DECK_IN_SESSION:
      return null;

    default:
      return state;
  }
};
export const initialDecks = [];

export default function decksReducer(state = initialDecks, action) {
  switch (action.type) {
    case GET_DECKS_DATA:
      return action.payload;
    default:
      return state;
  }
}
