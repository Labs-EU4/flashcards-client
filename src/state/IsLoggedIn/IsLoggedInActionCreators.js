import axios from "axios";
import * as types from "./isLoggedInActionTypes";

const action = (type, payload) => (payload ? {type, payload} : {type});

export const login = loginData => async dispatch => {
  dispatch(action(types.LOGIN_START));
  try {
    const response = await axios.post(
      "http://flashdecks-staging.herokuapp.com/api/auth/login",
      loginData
    );
    const userData = response.data.data.user;
    userData.token = response.data.data.token;
    dispatch(action(types.LOGIN_SUCCESS), {userData});
  } catch (error) {
    dispatch(action(types.LOGIN_FAILURE));
    if (error.response.data.error) {
      throw error.response.data.error;
    } else {
      throw error.response.data.message;
    }
  }
};
