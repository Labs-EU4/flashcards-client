import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PersonalDecks from "./PersonalDecks";

let wrapper;
beforeEach(() => {
  wrapper = rtl.render(<PersonalDecks />);
});

it("renders without crashing", () => {
  expect(wrapper.container).toMatchSnapshot();
});
