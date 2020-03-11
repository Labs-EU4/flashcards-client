import {axiosWithAuth} from "../../utils/axios";
import * as types from "../types";

export const getDecks = requestAddr => async dispatch => {
  try {
    const response = await axiosWithAuth().get(requestAddr);
    dispatch({
      type: types.GET_DECKS_DATA,
      payload: response.data.data,
    });
  } catch (err) {
    throw err;
  }
};
