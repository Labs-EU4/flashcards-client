import * as types from "../types";

const initialDecks = [];

export function publicDecksReducer(state = initialDecks, action) {
  switch (action.type) {
    case types.GET_PUBLIC_DECKS:
      return action.payload;
    default:
      return state;
  }
}

export function personalDecksReducer(state = initialDecks, action) {
  switch (action.type) {
    case types.GET_PERSONAL_DECKS:
      return action.payload;
    default:
      return state;
  }
}
