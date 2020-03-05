import * as types from "../../types/decks";

const initialState = {
  decks: [],
  id: null,
};

export function decksReducer(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_DECK:
      return {
        ...state,
        decks: [...state.decks, action.payload.deck],
      };
    case types.READ_DECK:
      return {
        ...state,
        decks: action.payload.deck,
      };
    case types.DELETE_DECK:
      return {
        ...state,
        decks: state.decks.filter(deck => deck.id !== action.payload.deck.id),
      };
    default:
      return state;
  }
}
