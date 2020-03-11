import * as types from "../types";

export const initialDecks = [];

export default function decksReducer(state = initialDecks, action) {
  switch (action.type) {
    case types.GET_DECKS_DATA:
      return action.payload;
    default:
      return state;
  }
}
