import {axiosWithAuth} from "../../../utils/axios";
import types from "../../types/index";

export const getAllDecks = id => dispatch => {
  console.log(dispatch);

  //almost always need dispatch as making axios call so using thunk
  axiosWithAuth()
    .get("/decks")
    // this is a promise
    .then(res => {
      console.log(res.data);
    })
    .catch(() => {
      console.log("error!!!");
    });
};
