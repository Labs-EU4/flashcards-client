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
    case types.DELETE_CARD:
      return {
        ...state,
        flashcards: state.flashcards.filter(card => card.id != action.payload),
      };
    case types.ADD_CARD: {
      return {...state, flashcards: [...state.flashcards, action.payload]};
    }
    case types.UPDATE_CARD: {
      return {
        ...state,
        flashcards: state.flashcards.map(card =>
          card.id === action.payload.id ? action.payload : card
        ),
      };
    }
    default:
      return state;
  }
};
