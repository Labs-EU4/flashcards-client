import {justAxios} from "../../utils/axios";
import * as types from "../types";

//creates a new user and if successful, logs them in and sets token in local storage
export const registerNewUser = newUser => async dispatch => {
  try {
    const response = await justAxios().post("/auth/register", newUser);
    localStorage.setItem("token", response.data.data.token);

    dispatch({
      type: types.REGISTER_SUCCESS,
      payload: {
        user: response.data.data.user,
        token: response.data.data.token,
      },
    });
  } catch (err) {
    throw err;
  }
};

export const login = loginData => async dispatch => {
  dispatch({
    type: types.LOGIN_START,
  });
  try {
    const response = await justAxios().post("/auth/login", loginData);
    localStorage.setItem("token", response.data.data.token);

    dispatch({
      type: types.LOGIN_SUCCESS,
      payload: {
        user: response.data.data.user,
        token: response.data.data.token,
      },
    });
  } catch (error) {
    dispatch({
      type: types.LOGIN_FAILURE,
    });
    if (error.response.data.error) {
      throw error.response.data.error;
    } else {
      throw error.response.data.message;
    }
  }
};
