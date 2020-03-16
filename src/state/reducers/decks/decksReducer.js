import * as types from "../../types";

const initialState = {
  userDecks: [],
  publicDecks: [],
};

const initialCurrentDeckState = {};

export function decksReducer(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_DECK:
      return {
        ...state,
        userDecks: [...state.userDecks, action.payload.deck],
      };
    case types.READ_DECK:
      return {
        ...state,
        userDecks: action.payload,
      };
    case types.DELETE_DECK:
      return {
        ...state,
        userDecks: state.userDecks.filter(deck => deck.id !== action.payload),
      };
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
