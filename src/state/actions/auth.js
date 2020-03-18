import {justAxios, axiosWithAuth} from "../../utils/axios";
import * as types from "../types";
import {setToken} from "../../utils/auth";

const action = (type, payload = null) => {
  if (payload) return {type, payload};
  return {type};
};

export const googleAuthorized = (initialToken, history) => async dispatch => {
  dispatch(action(types.LOGIN_START));
  try {
    const response = await axiosWithAuth().post(`/auth/google/${initialToken}`);
    const {user, token} = response.data.data;
    dispatch(action(types.LOGIN_SUCCESS, {user, token}));
    setToken(token);
    history.push("/");
  } catch (error) {
    dispatch(action(types.LOGIN_FAILURE));
    throw error.message;
  }
};

export const addRecoveryPassword = (password, intermediaryToken) => async dispatch => {
  try {
    const response = await justAxios().post(
      "/auth/recovery",
      {password},
      {
        headers: {Authorization: intermediaryToken},
      }
    );
    const {user, token} = response.data.data;
    setToken(token);
    dispatch(action(types.LOGIN_SUCCESS, {user, token}));
  } catch (error) {
    dispatch(action(types.LOGIN_FAILURE));
    throw error.message;
  }
};

//creates a new user and if successful, logs them in and sets token in local storage
export const registerNewUser = newUser => async dispatch => {
  try {
    const response = await justAxios().post("/auth/register", newUser);

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
    const {user, token} = response.data.data;
    localStorage.setItem("token", token);

    dispatch({
      type: types.LOGIN_SUCCESS,
      payload: {
        user,
        token,
      },
    });
  } catch (error) {
    dispatch({
      type: types.LOGIN_FAILURE,
    });
    throw error;
  }
};
