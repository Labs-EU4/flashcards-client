import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Home from "./Home";

jest.mock("react-router-dom", () => ({
  Link: "a",
}));

let wrapper;
beforeEach(() => {
  wrapper = rtl.render(<Home />);
});

afterEach(rtl.cleanup);

it("should take a snapshot", () => {
  const {asFragment} = rtl.render(<Home />);
  expect(asFragment(<Home />)).toMatchSnapshot();
});

describe("is the component rendering correctly", () => {
  it("renders the left content", () => {
    let queryValue = wrapper.getByTestId("content-left");
    expect(queryValue).toBeInTheDocument();
  });

  it("renders the right content", () => {
    let queryValue = wrapper.getByTestId("content-right");
    expect(queryValue).toBeInTheDocument();
  });
});
