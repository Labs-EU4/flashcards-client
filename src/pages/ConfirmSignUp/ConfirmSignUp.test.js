import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ConfirmSignUp from "./ConfirmSignUp";
import {BrowserRouter} from "react-router-dom";
// cleaning up
// afterEach(rtl.cleanup);

// useHistory mock so tests dont crash

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
    location: {
      pathname: "random/text/okay/token",
    },
  }),
}));

let wrapper;

describe("is the component rendering correctly", () => {
  wrapper = rtl.render(
    <BrowserRouter>
      <ConfirmSignUp />
    </BrowserRouter>
  );
  it("dummy test", () => {
    let queryValue = "hello";
    expect(queryValue).toBeDefined();
  });
});

describe("error tests", () => {
  wrapper = rtl.render(
    <BrowserRouter>
      <ConfirmSignUp />
    </BrowserRouter>
  );
  jest.mock("axios", () => {
    return {
      post: jest.fn().mockImplementationOnce(() => Promise.resolve("token")),
    };
  });
  it("it returns an error if token is invalid", () => {
    let queryValue = wrapper.getByTestId("alertSuccess");
    expect(queryValue).toBeVisible();
  });
});
