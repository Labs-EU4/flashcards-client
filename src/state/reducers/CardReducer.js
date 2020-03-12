import {FETCH_CARDS, UPDATE_CARD} from "../types";

const initialForm = [];

const CardReducer = (state = initialForm, action) => {
  switch (action.type) {
    case FETCH_CARDS:
      return action.payload;
    case UPDATE_CARD:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default CardReducer;
