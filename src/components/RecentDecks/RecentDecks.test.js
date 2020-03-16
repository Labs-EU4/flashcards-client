import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import RecentDecks from "./RecentDecks";

let wrapper;
beforeEach(() => {
  wrapper = rtl.render(<RecentDecks />);
});

afterEach(rtl.cleanup);

it("should take a snapshot", () => {
  const {asFragment} = rtl.render(<RecentDecks />);

  expect(asFragment(<RecentDecks />)).toMatchSnapshot();
});

describe("is the component rendering correctly", () => {
  it("renders the heading", () => {
    let queryValue = wrapper.getByTestId("heading");
    expect(queryValue).toBeInTheDocument();
  });

  it("renders the heading", () => {
    let queryValue = wrapper.getByTestId("decks");
    expect(queryValue).toBeInTheDocument();
  });
});
