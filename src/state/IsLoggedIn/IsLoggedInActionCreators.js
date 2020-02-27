import axios from "axios";
import * as types from "./isLoggedInActionTypes";

const action = (type, payload) => (payload ? {type, payload} : {type});

export const login = (errorSetter, loginData) => async dispatch => {
  dispatch(action(types.LOGIN_START));
  try {
    const response = await axios.post("/api/auth/register", loginData);
    const userData = response.data.data.user;
    userData.token = response.data.data.token;
    dispatch(action(types.LOGIN_SUCCESS), {userData});
  } catch (error) {
    console.debug(error);
    errorSetter(error);
    dispatch(action(types.LOGIN_FAILURE));
  }
};
