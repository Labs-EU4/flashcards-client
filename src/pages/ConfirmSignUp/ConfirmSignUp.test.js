import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ConfirmSignUp from "./ConfirmSignUp";
import axios from "axios";

jest.mock("axios");
let wrapper;
afterEach(rtl.cleanup);
beforeEach(() => {
  wrapper = rtl.render(<ConfirmSignUp />);
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
  // it("renders the loader", () => {
  //   let queryValue = wrapper.getByTestId("loader");
  //   expect(queryValue).toBeInTheDocument();
  // });
  it("renders the logo", () => {
    let queryValue = wrapper.getByTestId("logo");
    expect(queryValue).toBeInTheDocument();
  });
});

describe("error tests", () => {
  it("it returns an error if token is invalid", async () => {
    axios.post.mockImplementation(() => Promise.reject({data: "error"}));
    await rtl.waitForElement(() => wrapper.getByTestId("alertInvalid"));
    let queryValue = wrapper.getByTestId("alertInvalid");
    expect(queryValue).toBeVisible();
  });
  axios.post.mockImplementation(() => Promise.reject({data: "error"}));
  it("it returns a button if token is invalid", async () => {
    await rtl.waitForElement(() => wrapper.getByTestId("button"));
    let queryValue = wrapper.getByTestId("button");
    expect(queryValue).toBeVisible();
  });
});

// describe("success tests", () => {
//   it("it returns a success if token is valid", async () => {
//     axios.post.mockImplementation(() => Promise.resolve({data: "success"}));
//     await rtl.waitForElement(() => wrapper.getByTestId("alertSuccess"));
//     let queryValue = wrapper.getByTestId("alertSuccess");
//     expect(queryValue).toBeVisible();
//   });
// });
