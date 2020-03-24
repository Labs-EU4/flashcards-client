import * as types from "../types/index";
import {combineReducers} from "redux";

const initialDecks = [];
const initialCurrentDeckState = {};

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
// export function currentDeckReducer(state = initialCurrentDeckState, action) {
//   switch (action.type) {
//     case GET_DECK_BY_ID:
//       return action.payload;
//     default:
//       return state;
//   }
// }

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

const decksStateReducer = combineReducers({
  publicDeckState: publicDecksReducer,
  personalDeckState: personalDecksReducer,
  currentDeckState: currentDeckReducer,
  deckInPlaySession: playModeReducer,
});
export default decksStateReducer;
