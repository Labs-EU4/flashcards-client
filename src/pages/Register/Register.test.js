import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {RegisterForm} from "./Register";

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

afterEach(rtl.cleanup);

let wrapper;

beforeEach(() => {
  wrapper = rtl.render(<RegisterForm />);
});

let FormContainer = () => {
  return wrapper.getByTestId("test_register_container");
};

let RegisterFormTest = () => {
  return wrapper.getByTestId("test_register_form");
};

let EmailFormItem = () => {
  return wrapper.getByTestId("test_email_form_item");
};

let EmailInput = () => {
  return wrapper.getByTestId("test_email_input");
};

let UsernameFormItem = () => {
  return wrapper.getByTestId("test_username_form_item");
};

let UsernameInput = () => {
  return wrapper.getByTestId("test_username_input");
};

let PasswordFormItem = () => {
  return wrapper.getByTestId("test_password_form_item");
};

let PasswordInput = () => {
  return wrapper.getByTestId("test_password_input");
};

let SubmitFormItem = () => {
  return wrapper.getByTestId("test_submit_form_item");
};

let SubmitButton = () => {
  return wrapper.getByTestId("test_submit_button");
};

it("renders without crashing", () => {
  expect(wrapper.container).toMatchSnapshot();
});

it("renders expected elements properly -> DEFAULT", () => {
  expect(FormContainer()).toBeInTheDocument();
  expect(RegisterFormTest()).toBeInTheDocument();
  expect(EmailFormItem()).toBeInTheDocument();
  expect(EmailInput()).toBeInTheDocument();
  expect(UsernameFormItem()).toBeInTheDocument();
  expect(UsernameInput()).toBeInTheDocument();
  expect(PasswordFormItem()).toBeInTheDocument();
  expect(PasswordInput()).toBeInTheDocument();
  expect(SubmitFormItem()).toBeInTheDocument();
  expect(SubmitButton()).toBeInTheDocument();
});

const newUser = {
  email: "darraghferry@hotmail.com",
  username: "darragh",
  password: "password",
};

it("renders expected elements properly -> INPUT FIELD CHANGES", () => {
  rtl.fireEvent.change(EmailInput(), {target: {value: newUser.email}});
  expect(EmailInput().value).toBe(newUser.email);
  rtl.fireEvent.change(UsernameInput(), {target: {value: newUser.username}});
  expect(UsernameInput().value).toBe(newUser.username);
  rtl.fireEvent.change(PasswordInput(), {target: {value: newUser.password}});
  expect(PasswordInput().value).toBe(newUser.password);
});
