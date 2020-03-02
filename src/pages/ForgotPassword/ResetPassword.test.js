import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ResetPassword from "./ResetPassword.js";

afterEach(rtl.cleanup);

let wrapper;
beforeEach(() => {
  wrapper = rtl.render(<ResetPassword />);
});

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
    location: {
      pathname: "random/text/okay",
    },
  }),
}));

describe("is the component rendering correctly", () => {
  it("renders the heading", () => {
    let queryValue = wrapper.queryByText(/Reset Password/);
    expect(queryValue).toBeDefined();
  });

  it("renders the form placeholder", () => {
    let queryValue = wrapper.getByPlaceholderText(/New Password/);
    expect(queryValue).toBeDefined();
  });

  it("renders the form placeholder", () => {
    let queryValue = wrapper.getByPlaceholderText(/Confirm Password/);
    expect(queryValue).toBeDefined();
  });

  it("renders the button", () => {
    let button = wrapper.queryByText(/^Reset$/i);
    expect(button).toBeDefined();
  });
});

describe("the input field is working", () => {
  it("responds to text input", () => {
    let input = wrapper.getByPlaceholderText(/New Password/);
    rtl.fireEvent.click(input);
    rtl.fireEvent.keyDown(input, {key: "A", code: 65, charCode: 65});
    rtl.fireEvent.keyDown(input, {key: "B", code: 66, charCode: 66});
    rtl.fireEvent.keyDown(input, {key: "C", code: 67, charCode: 67});
    let formValue = wrapper.queryByText(/ABC/);
    expect(formValue).toBeDefined();
  });

  it("responds to text input", () => {
    let input = wrapper.getByPlaceholderText(/Confirm Password/);
    rtl.fireEvent.click(input);
    rtl.fireEvent.keyDown(input, {key: "A", code: 65, charCode: 65});
    rtl.fireEvent.keyDown(input, {key: "B", code: 66, charCode: 66});
    rtl.fireEvent.keyDown(input, {key: "C", code: 67, charCode: 67});
    let formValue = wrapper.queryByText(/ABC/);
    expect(formValue).toBeDefined();
  });

  it("shows an validation error if input field is empty", () => {
    let input = wrapper.getByPlaceholderText(/New Password/);
    rtl.fireEvent.click(input);
    rtl.fireEvent.keyDown(input, {key: "A", code: 65, charCode: 65});
    rtl.fireEvent.keyDown(input, {key: "backspace", code: 8});
    let error = wrapper.queryByText(/Password must be at least 5 characters/);
    expect(error).toBeDefined();
  });

  it("shows an validation error if input field has apasswort shorter than 5 characters", () => {
    let input = wrapper.getByPlaceholderText(/New Password/);
    rtl.fireEvent.click(input);
    rtl.fireEvent.keyDown(input, {key: "A", code: 65, charCode: 65});
    rtl.fireEvent.keyDown(input, {key: "B", code: 66, charCode: 66});
    rtl.fireEvent.keyDown(input, {key: "C", code: 67, charCode: 67});
    let error = wrapper.queryByText(/Password must be at least 5 characters/);
    expect(error).toBeDefined();
  });
});
