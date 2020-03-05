import axiosWithAuth from "../auth";
import types from "../../types/index";

export const getAllDecks = id => dispatch => {
  //almost always need dispatch as making axios call so using thunk
  axiosWithAuth()
    .get("/api/decks")
    // this is a promise
    .then()
    .catch(() => {
      console.log("error!!!");
    });
};
