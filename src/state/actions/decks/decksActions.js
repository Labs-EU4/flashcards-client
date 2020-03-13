import {axiosWithAuth} from "../../../utils/axios";
import types, {READ_DECK, DELETE_DECK} from "../../types/index";

export const getAllDecks = () => dispatch => {
  axiosWithAuth()
    .get("/decks")
    .then(res => {
      console.log("HIIII", res.data.data);
      dispatch({
        type: READ_DECK,
        payload: res.data.data,
      });
    })
    .catch(() => {
      console.log("error!!!");
    });
};

export const deleteDeck = id => dispatch => {
  axiosWithAuth()
    .delete("/decks/" + id)
    .then(res => {
      console.log(res.data.data);
      dispatch({
        type: DELETE_DECK,
        payload: id,
      });
    })
    .catch(() => {
      console.log("error");
    });
};
