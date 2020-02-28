/* import React from "react";
import {WrappedNormalLoginForm} from "../Login";
import rtl, {render, fireEvent, getByText} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

const loginAction = jest.fn();

const setup = () => {
  const utils = render(<WrappedNormalLoginForm login={loginAction} />);
  const loginButton = utils.getByText(/login/i);
  const emailInput = utils.getByPlaceholderText(/Email/);
  const passwordInput = utils.getByPlaceholderText(/Password/);
  return {
    ...utils,
    loginButton,
    emailInput,
    passwordInput,
  };
};

describe("Login component", () => {
  test("Renders inputs and a login button", () => {
    const {loginButton, emailInput, passwordInput} = setup();
    expect(loginButton).toBeDefined();
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
  });
  test("Sends a request on clicking", () => {
    // const {getByText} = render(<WrappedNormalLoginForm />);
    const {loginButton} = setup();
    // fireEvent.click(getByText(/Login/));
    fireEvent.click(loginButton);
    expect(loginAction).toHaveBeenCalledTimes(1);
  });
});
 */
