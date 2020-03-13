import * as types from "../types";

const initialDecks = [];

export const decksReducer = (state = initialDecks, action) => {
  switch (action.type) {
    case types.GET_DECKS_DATA:
      return action.payload;
    default:
      return state;
  }
};

const currentDeck = {};

export const currentDeckReducer = (state = currentDeck, action) => {
  switch (action.type) {
    case types.GET_SINGLE_DECK:
      return action.payload;
    default:
      return state;
  }
};
