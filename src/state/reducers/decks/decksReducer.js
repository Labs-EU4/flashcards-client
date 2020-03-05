import * as types from "../../types/decks";

const initialState = {};

export function decksReducer(decks = initialState.decks, action) {
  switch (action.type) {
    case types.CREATE_DECK:
      return action.payload.deck;
    case types.READ_DECK:
      return decks;
    case types.UPDATE_DECK:
      return decks;
    case types.DELETE_DECK:
      return decks.filter(deck => deck.id !== action.payload.id);
    default:
      return decks;
  }
}
