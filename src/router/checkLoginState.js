import store from "../state/store";

export default function checkLoginState() {
  return store.getState.isLoggedIn;
}
