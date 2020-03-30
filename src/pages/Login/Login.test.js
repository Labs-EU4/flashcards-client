import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {BrowserRouter} from "react-router-dom";
import {WrappedNormalLoginForm as Login} from "./Login";

let promise;
const mockLogin = jest.fn();
const mockHistory = {push: jest.fn()};
let wrapper;
beforeEach(() => {
  jest.resetAllMocks();
  promise = Promise.resolve();
  wrapper = rtl.render(
    <BrowserRouter>
      <Login
        login={mockLogin.mockImplementationOnce(() => promise)}
        history={mockHistory}
      />
    </BrowserRouter>
  );
});

const EmailInput = () => {
  return wrapper.getByTestId("email-input");
};

const PasswordInput = () => {
  return wrapper.getByTestId("password-input");
};

const Button = () => {
  return wrapper.getByTestId("login-button");
};

it("renders without crashing", () => {
  expect(wrapper.container).toBeInTheDocument();
});

it("renders all expected elements", () => {
  expect(EmailInput()).toBeInTheDocument();
  expect(PasswordInput()).toBeInTheDocument();
  expect(Button()).toBeInTheDocument();
});

it("does not submit due to submit button being disabled", () => {
  expect(Button()).toBeDisabled();
});

it("does not make an axios call if some input fields are left blank", () => {
  rtl.fireEvent.click(Button());
  expect(mockLogin).toHaveBeenCalledTimes(0);
});

it("Calls correct action on submit", async () => {
  rtl.fireEvent.change(EmailInput(), {
    target: {value: "darragh@test.com"},
  });
  rtl.fireEvent.change(PasswordInput(), {
    target: {value: "123456789"},
  });
  rtl.fireEvent.click(Button());
  await rtl.act(() => promise);
  expect(mockLogin).toHaveBeenCalledTimes(1);
  expect(mockLogin.mock.calls[0]).toMatchInlineSnapshot(`
    Array [
      Object {
        "email": "",
        "password": "",
      },
    ]
  `);
});
