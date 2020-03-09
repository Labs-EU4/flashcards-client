import * as types from "../types";

export const initialState = {
  isLoggedIn: false,
  user: {},
  token: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_START:
      return state;

    case types.REGISTER_SUCCESS:
    case types.LOGIN_SUCCESS:
      return {
        isLoggedIn: true,
        user: action.payload.user,
        token: action.payload.token,
      };

    case types.LOGIN_FAILURE:
    case types.LOGOUT:
      return initialState;

    default:
      return state;
  }
}
