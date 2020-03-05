import axiosWithAuth from "../auth";
import types from "../../types";

export const getExperience = id => dispatch => {
  //almost always need dispatch as making axios call so using thunk
  axiosWithAuth()
    .get("/experiences/" + id)

    // this is a promise

    .then(response => {
      console.log(response.data);
      dispatch({
        //call dispatch function pass in object
        type: types.EDIT, //types tell you what action is
        payload: {
          experience: response.data,
        },
      });
      dispatch({
        type: types.SET_EXPERIENCE,
        payload: {
          experience: response.data,
        },
      });
    })
    .catch(() => {
      console.log("error!!!");
    });
};
