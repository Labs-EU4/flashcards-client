import {CLEAR_DECK_IN_SESSION} from "../types";

export const playModeReducer = (state, action) => {
  switch (action.type) {
    case CLEAR_DECK_IN_SESSION:
      return null;

    default:
      return state;
  }
};
