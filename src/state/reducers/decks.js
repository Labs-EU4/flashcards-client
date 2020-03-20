import * as types from "../types";

const initialDecks = [];
const initialCurrentDeckState = {};

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
      return state;
    case types.READ_DECK:
      return action.payload;
    case types.UPDATE_DECK:
      return state.map(deck =>
        deck.deck_id === action.payload.deck_id ? action.payload : deck
      );
    case types.CREATE_DECK:
      return [...state, action.payload.deck];
    case types.DELETE_DECK:
      return state.filter(deck => deck.deck_id !== action.payload);
    default:
      return state;
  }
}

export function currentDeckReducer(state = initialCurrentDeckState, action) {
  switch (action.type) {
    case types.GET_DECK_BY_ID:
      return action.payload;
    default:
      return state;
  }
}
