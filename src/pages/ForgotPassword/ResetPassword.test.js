import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ResetPassword from "./ResetPassword";

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
    location: {
      pathname: "random/text/okay",
    },
  }),
}));

afterEach(rtl.cleanup);
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
    location: {
      pathname: "random/text/okay/token",
    },
  }),
  Link: "a",
}));
let wrapper;

beforeEach(() => {
  wrapper = rtl.render(<ResetPassword />);
});

describe("is the component rendering correctly", () => {
  it("renders the form", () => {
    let queryValue = wrapper.queryByTestId("form");
    expect(queryValue).toBeInTheDocument();
  });

  it("renders the logo", () => {
    let queryValue = wrapper.getByTestId("logo");
    expect(queryValue).toBeInTheDocument();
  });

  it("renders the form placeholder", () => {
    let queryValue = wrapper.getByPlaceholderText(/New Password/);
    expect(queryValue).toBeInTheDocument();
  });

  it("renders the second form placeholder", () => {
    let queryValue = wrapper.getByPlaceholderText(/Confirm Password/);
    expect(queryValue).toBeInTheDocument();
  });

  it("renders the button", () => {
    let button = wrapper.queryByText(/^Reset$/i);
    expect(button).toBeInTheDocument();
  });
  it("renders the heading", () => {
    let queryValue = wrapper.queryByText(/Reset Password/);
    expect(queryValue).toBeInTheDocument();
  });
});

describe("the input field validation is working", () => {
  it("shows an validation error if input field has a password shorter than 5 characters", async () => {
    let input = wrapper.queryByTestId("inputPassword");
    rtl.fireEvent.change(input, {
      target: {value: "123"},
    });
    let error = await wrapper.queryByText(/Password must be at least 5 characters/);
    expect(error).toBeInTheDocument();
  });

  it("shows no validation error if input field has a password longer than 5 characters", async () => {
    let input = wrapper.queryByTestId("inputPassword");
    rtl.fireEvent.change(input, {
      target: {value: "123456"},
    });
    let error = await wrapper.queryByText(/Password must be at least 5 characters/);
    expect(error).not.toBeInTheDocument();
  });

  it("shows an validation error if input field has none matching passwords", async () => {
    let input = wrapper.queryByTestId("inputPassword");
    rtl.fireEvent.change(input, {
      target: {value: "123456"},
    });
    let inputConfirm = wrapper.queryByTestId("inputPasswordConfirm");
    rtl.fireEvent.change(inputConfirm, {
      target: {value: "12345678"},
    });
    let error = await wrapper.queryByText(/The passwords have to match!/);
    expect(error).toBeInTheDocument();
  });

  it("shows no validation error if input field has matching passwords", async () => {
    let input = wrapper.queryByTestId("inputPassword");
    rtl.fireEvent.change(input, {
      target: {value: "123456"},
    });
    let inputConfirm = wrapper.queryByTestId("inputPasswordConfirm");
    rtl.fireEvent.change(inputConfirm, {
      target: {value: "123456"},
    });
    let error = await wrapper.queryByText(/The passwords have to match!/);
    expect(error).not.toBeInTheDocument();
  });
});

describe("form renders input values", () => {
  it("shows the value put in the first form field", () => {
    let input = wrapper.queryByTestId("inputPassword");
    rtl.fireEvent.change(input, {
      target: {value: "123456"},
    });
    let field = wrapper.queryByTestId("inputPassword");
    let fieldValue = field.value;
    expect(fieldValue).toBe("123456");
  });
  it("shows the value put in the confirm password form field", () => {
    let input = wrapper.queryByTestId("inputPasswordConfirm");
    rtl.fireEvent.change(input, {
      target: {value: "123456"},
    });
    let field = wrapper.queryByTestId("inputPasswordConfirm");
    let fieldValue = field.value;
    expect(fieldValue).toBe("123456");
  });
});

/* describe("form renders an alert", () => {
  it("renders that the token is invalid", async () => {
    let input = wrapper.queryByTestId("inputPassword");
    rtl.fireEvent.change(input, {
      target: {value: "123456"},
    });
    let inputConfirm = wrapper.queryByTestId("inputPasswordConfirm");
    rtl.fireEvent.change(inputConfirm, {
      target: {value: "123456"},
    });
    rtl.fireEvent.click(wrapper.queryByTestId("button"));
    let alert = await rtl.waitForElement(() => wrapper.queryByTestId("alertInvalid"));
    expect(alert).toBeInTheDocument();
  });
}); */
