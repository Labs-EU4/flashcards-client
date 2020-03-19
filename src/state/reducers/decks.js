import {
  CLEAR_DECK_IN_SESSION,
  SET_DECK_IN_SESSION,
  GET_PUBLIC_DECKS,
  GET_PERSONAL_DECKS,
  READ_DECK,
  CREATE_DECK,
  DELETE_DECK,
  GET_DECK_BY_ID,
  UPDATE_CARD,
  ADD_CARD,
  GET_SINGLE_DECK,
  DELETE_CARD,
} from "../types";
import {combineReducers} from "redux";

const initialPlayModeState = null;
export const playModeReducer = (state = initialPlayModeState, action) => {
  switch (action.type) {
    case CLEAR_DECK_IN_SESSION:
      return null;
    case SET_DECK_IN_SESSION:
      return action.payload;
    default:
      return state;
  }
};
const initialDecks = [];
const initialCurrentDeckState = {};

export const publicDecksReducer = (state = initialDecks, action) => {
  switch (action.type) {
    case GET_PUBLIC_DECKS:
      return action.payload;
    default:
      return state;
  }
};

export function personalDecksReducer(state = initialDecks, action) {
  switch (action.type) {
    case GET_PERSONAL_DECKS:
    case READ_DECK:
      return action.payload;
    case CREATE_DECK:
      return [...state, action.payload.deck];
    case DELETE_DECK:
      return state.filter(deck => deck.id !== action.payload);
    default:
      return state;
  }
}

const currentDeck = {};

export const currentDeckReducer = (state = currentDeck, action) => {
  switch (action.type) {
    case GET_SINGLE_DECK:
      return action.payload;
    case DELETE_CARD:
      return {
        ...state,
        flashcards: state.flashcards.filter(card => card.id != action.payload),
      };
    case ADD_CARD: {
      return {...state, flashcards: [action.payload, ...state.flashcards]};
    }
    case UPDATE_CARD: {
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

export default combineReducers({
  deckInPlaySession: playModeReducer,
  publicDeckState: publicDecksReducer,
  personalDeckState: personalDecksReducer,
});
