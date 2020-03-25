import {combineReducers} from "redux";
import * as types from "../types";

const initialDecks = [];

export const publicDecksReducer = (state = initialDecks, action) => {
  switch (action.type) {
    case types.GET_PUBLIC_DECKS:
      return action.payload;
    default:
      return state;
  }
};

export function personalDecksReducer(state = initialDecks, action) {
  switch (action.type) {
    case types.READ_DECK:
      return action.payload;
    case types.UPDATE_DECK:
      return state.map(deck =>
        deck.deck_id === action.payload.deck_id ? action.payload : deck
      );
    case types.CREATE_DECK:
      return [...state, action.payload];
    case types.DELETE_DECK:
      return state.filter(deck => deck.deck_id !== action.payload);
    default:
      return state;
  }
}

const currentDeck = {};

export const currentDeckReducer = (state = currentDeck, action) => {
  switch (action.type) {
    case types.GET_DECK_BY_ID:
      return action.payload;
    case types.DELETE_CARD:
      return {
        ...state,
        flashcards: state.flashcards.filter(card => card.id != action.payload),
      };
    case types.ADD_CARD: {
      return {...state, flashcards: [action.payload, ...state.flashcards]};
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

const initialPlayModeState = null;
export const playModeReducer = (state = initialPlayModeState, action) => {
  switch (action.type) {
    case types.CLEAR_DECK_IN_SESSION:
      return null;
    case types.SET_DECK_IN_SESSION:
      return action.payload;
    default:
      return state;
  }
};

export const recentDecksReducer = (state = initialDecks, action) => {
  switch (action.type) {
    case types.GET_RECENT_START:
    case types.GET_RECENT_FAILURE:
      return state;
    case types.GET_RECENT_SUCCESS:
      return action.payload;
    case types.TOUCH_DECK_START:
    case types.TOUCH_DECK_FAILURE:
      return state;
    case types.TOUCH_DECK_SUCCESS:
      return [action.payload, ...state].slice(0, 3);
    default:
      return state;
  }
};

const decksStateReducer = combineReducers({
  publicDeckState: publicDecksReducer,
  personalDeckState: personalDecksReducer,
  currentDeckState: currentDeckReducer,
  deckInPlaySession: playModeReducer,
  recentDecks: recentDecksReducer,
});
export default decksStateReducer;
