import { LOGIN_SUCCESS, LOGOUT } from "../IsLoggedIn/isLoggedInActionTypes";
import { UPDATE_USER_DETAILS } from "./userDataActionTypes";

const initialUserData = null;
export default function userDataReducer(state = initialUserData, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.payload.userData;
    case LOGOUT:
      return initialUserData;
    case UPDATE_USER_DETAILS:
      return action.payload.userData;
    default:
      return state;
  }
}
