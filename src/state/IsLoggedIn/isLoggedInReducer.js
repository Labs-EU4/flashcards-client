import {LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS, LOGOUT} from "./isLoggedInActionTypes";

const initialLoggedInState = false;
export default function isLoggedInReducer(state = initialLoggedInState, action) {
  switch (action.type) {
    case LOGIN_START:
      return state;
    case LOGIN_FAILURE:
      return false;
    case LOGIN_SUCCESS:
      return true;
    case LOGOUT:
      return false;
    default:
      return state;
  }
}
