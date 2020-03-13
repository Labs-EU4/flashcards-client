import {FETCH_CARDS, UPDATE_CARD, DELETE_CARD} from "../types";

const initialForm = [];

const CardReducer = (state = initialForm, action) => {
  switch (action.type) {
    case FETCH_CARDS:
      return action.payload;
    case UPDATE_CARD:
      return [action.payload, ...state];

    case DELETE_CARD:
      return [...state, state.filter(card => card.id !== action.payload.card.id)];

    default:
      return state;
  }
};

export default CardReducer;
