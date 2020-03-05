import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ConfirmSignUp from "./ConfirmSignUp";

// cleaning up
afterEach(rtl.cleanup);

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
  it("dummy test", () => {
    let queryValue = "hello";
    expect(queryValue).toBeDefined();
  });
});