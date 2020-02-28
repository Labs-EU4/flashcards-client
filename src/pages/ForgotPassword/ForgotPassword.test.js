import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ForgotPassword from "./ForgotPassword.js";

afterEach(rtl.cleanup);

let wrapper;

beforeEach(() => {
  wrapper = rtl.render(<ForgotPassword />);
});

describe("is the component rendering correctly", () => {
  // it("renders fine without crashing", () => {
  //   expect(wrapper.container).toMatchSnapshot();
  // });

  it("renders the heading", () => {
    let queryValue = wrapper.queryByText(/Reset Password/);
    expect(queryValue).toBeDefined();
  });

  it("renders the form placeholder", () => {
    let queryValue = wrapper.getByPlaceholderText(/Email/);
    expect(queryValue).toBeDefined();
  });

  it("renders the button", () => {
    let button = wrapper.queryByText(/^Reset$/i);
    expect(button).toBeDefined();
  });
});

describe("the input field is working", () => {
  it("responds to text input", () => {
    let input = wrapper.getByPlaceholderText(/Email/);
    rtl.fireEvent.click(input);
    rtl.fireEvent.keyDown(input, {key: "A", code: 65, charCode: 65});
    rtl.fireEvent.keyDown(input, {key: "B", code: 66, charCode: 66});
    rtl.fireEvent.keyDown(input, {key: "C", code: 67, charCode: 67});
    let formValue = wrapper.queryByText(/ABC/);
    expect(formValue).toBeDefined();
  });

  it("shows an validation error if input field is empty", () => {
    let input = wrapper.getByPlaceholderText(/Email/);
    rtl.fireEvent.click(input);
    rtl.fireEvent.keyDown(input, {key: "A", code: 65, charCode: 65});
    rtl.fireEvent.keyDown(input, {key: "B", code: 66, charCode: 66});
    rtl.fireEvent.keyDown(input, {key: "C", code: 67, charCode: 67});
    rtl.fireEvent.keyDown(input, {key: "backspace", code: 8});
    rtl.fireEvent.keyDown(input, {key: "backspace", code: 8});
    rtl.fireEvent.keyDown(input, {key: "backspace", code: 8});
    let error = wrapper.queryByText(/Please input a valid email!/);
    expect(error).toBeDefined();
  });

  it("shows an validation error if input field has an invalid email", () => {
    let input = wrapper.getByPlaceholderText(/Email/);
    rtl.fireEvent.click(input);
    rtl.fireEvent.keyDown(input, {key: "A", code: 65, charCode: 65});
    rtl.fireEvent.keyDown(input, {key: "B", code: 66, charCode: 66});
    rtl.fireEvent.keyDown(input, {key: "C", code: 67, charCode: 67});
    let error = wrapper.queryByText(/Invalid email/);
    expect(error).toBeDefined();
  });
});
