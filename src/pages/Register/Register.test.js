import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {RegisterForm} from "./Register";

const mockRegister = jest.fn().mockResolvedValue(10);
let wrapper;
beforeEach(() => {
  wrapper = rtl.render(<RegisterForm registerNewUser={mockRegister} />);
});

const FormContainer = () => {
  return wrapper.queryByTestId("test_register_container");
};

const Form = () => {
  return wrapper.queryByTestId("test_register_form");
};

const EmailInput = () => {
  return wrapper.queryByTestId("test_email_input");
};

const UsernameInput = () => {
  return wrapper.queryByTestId("test_username_input");
};

const PasswordInput = () => {
  return wrapper.queryByTestId("test_password_input");
};

const Button = () => {
  return wrapper.queryByTestId("test_submit_button");
};

const EmailWarning = () => {
  return wrapper.queryByText("Not a valid email");
};

const UsernameWarning = () => {
  return wrapper.queryByText("Username must be at least 5 characters");
};

const PasswordWarning = () => {
  return wrapper.queryByText("Password must be at least 5 characters");
};

it("renders without crashing", () => {
  expect(wrapper.container).toMatchSnapshot();
});

it("renders all expected elements", () => {
  expect(FormContainer()).toBeInTheDocument();
  expect(Form()).toBeInTheDocument();
  expect(EmailInput()).toBeInTheDocument();
  expect(UsernameInput()).toBeInTheDocument();
  expect(PasswordInput()).toBeInTheDocument();
  expect(Button()).toBeInTheDocument();
});

it("does not submit due to submit button being disabled", () => {
  rtl.fireEvent.click(Button());
  expect(mockRegister).toHaveBeenCalledTimes(0);
});

it("does not make an axios call if some input fields are left blank", () => {
  rtl.fireEvent.submit(Form());
  expect(mockRegister).toHaveBeenCalledTimes(0);
});

it("Calls correct action on submit", () => {
  rtl.fireEvent.change(EmailInput(), {
    target: {value: "darragh@test.com"},
  });
  rtl.fireEvent.change(UsernameInput(), {
    target: {value: "Darragh Ferry"},
  });
  rtl.fireEvent.change(PasswordInput(), {
    target: {value: "123456789"},
  });
  rtl.fireEvent.submit(Form());
  expect(mockRegister).toHaveBeenCalledTimes(1);
  expect(mockRegister.mock.calls[0]).toMatchInlineSnapshot(`
    Array [
      Object {
        "email": "darragh@test.com",
        "fullName": "Darragh Ferry",
        "password": "123456789",
      },
    ]
  `);
});

it("Displays correct warning messages on input fields", () => {
  rtl.fireEvent.blur(EmailInput());
  expect(EmailWarning()).toBeInTheDocument();
  rtl.fireEvent.blur(UsernameInput());
  expect(UsernameWarning()).toBeInTheDocument();
  rtl.fireEvent.blur(PasswordInput());
  expect(PasswordWarning()).toBeInTheDocument();
});

afterEach(rtl.cleanup);