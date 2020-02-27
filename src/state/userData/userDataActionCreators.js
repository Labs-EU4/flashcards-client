import axios from "axios";
import * as types from "./userDataActionTypes";

//creates a new user and if successful, logs them in and sets token in local storage
export const registerNewUser = newUser => async dispatch => {
  try {
    const res = await axios.post("http://localhost:4003/api/auth/register", newUser);
    localStorage.setItem("token", res.data.data.token);
    dispatch({
      type: types.UPDATE_USER_DETAILS,
      payload: {userData: res.data.data.user},
    });
  } catch (err) {
    throw err;
  }
};
