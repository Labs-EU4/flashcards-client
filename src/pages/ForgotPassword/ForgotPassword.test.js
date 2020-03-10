import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FormComponent from "./ForgotPassword";
// cleaning up
afterEach(rtl.cleanup);

jest.mock("axios", () => {
  return {
    post: jest.fn().mockRejectedValue("boo!"),
  };
});

let wrapper;

beforeEach(() => {
  wrapper = rtl.render(<FormComponent />);
});

// useHistory mock so tests dont crash
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
    location: {
      pathname: "random/text/okay/token",
    },
  }),
  Link: "a",
}));

describe("is the component rendering correctly", () => {
  it("renders the form placeholder", () => {
    let queryValue = wrapper.getByPlaceholderText(/Email/);
    expect(queryValue).toBeDefined();
  });

  it("renders the button", () => {
    let button = wrapper.queryByText(/^Reset$/i);
    expect(button).toBeDefined();
  });
});

describe("the input field + validation is working", () => {
  it("shows an validation error if input field has an invalid email", () => {
    rtl.fireEvent.change(wrapper.getByTestId("email"), {
      target: {value: "randomemail"},
    });
    let error = wrapper.queryByText(/Invalid email/);
    expect(error).toHaveTextContent(/invalid/i);
  });
});

describe("submit tests", () => {
  it("gives an alert if email is not in database", async () => {
    rtl.fireEvent.change(wrapper.getByTestId("email"), {
      target: {value: "randomemail@email.com"},
    });

    rtl.fireEvent.click(wrapper.getByTestId("button"));
    await rtl.wait(() => {
      expect(wrapper.getByTestId("alertInvalid")).toHaveTextContent(/Email invalid/);
    });
  });
});

describe("form renders an alert", () => {
  it("renders that the email is invalid", async () => {
    let input = wrapper.queryByTestId("email");
    rtl.fireEvent.change(input, {
      target: {value: "jhkjdsfkjsdfhkjdsfhkjsdfsdk@gmail.com"},
    });
    rtl.fireEvent.click(wrapper.queryByTestId("button"));
    let alert = await rtl.waitForElement(() => wrapper.queryByTestId("alertInvalid"));
    expect(alert).toBeInTheDocument();
  });
});

describe("form renders input value", () => {
  it("shows the value put in the first form field", () => {
    let input = wrapper.queryByTestId("email");
    rtl.fireEvent.change(input, {
      target: {value: "oidjsajdkasjkad@gmail.com"},
    });
    let field = wrapper.queryByTestId("email");
    let fieldValue = field.value;
    expect(fieldValue).toBe("oidjsajdkasjkad@gmail.com");
  });
});
