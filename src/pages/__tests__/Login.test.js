import React from "react";
import Login from "../Login";
import {render, fireEvent, wait, cleanup} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {Provider} from "react-redux";

const mockStore = configureStore([thunk]);
let wrapper, store;
beforeEach(() => {
  wrapper = render(
    <Provider store={store}>
      <Login />
    </Provider>
  );
  store = mockStore({
    isLoggedIn: false,
    userData: null,
  });
});
/* 
afterEach(cleanup);

describe("Login component", () => {
  test("Renders inputs and a login button", () => {
    const {getByText, getByPlaceholderText} = wrapper;
    expect(getByText(/login/i)).toBeDefined();
    expect(getByPlaceholderText(/email/i)).toBeDefined();
    expect(getByPlaceholderText(/password/i)).toBeDefined();
  });
  test("Sends a request on clicking", async () => {
    const {getByText, getByPlaceholderText} = wrapper;
    fireEvent.click(getByText(/login/i));
    await wait(() => {
      expect(store.dispatch).toHaveBeenCalledTimes(1);
    });
    expect(store.dispatch.mock.calls).toMatchInlineSnapshot();
  });
});
 */
