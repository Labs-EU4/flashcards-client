import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PublicDecks from "./PublicDecks";

let wrapper;
beforeEach(() => {
  wrapper = rtl.render(<PublicDecks />);
});

it("renders without crashing", () => {
  expect(wrapper.container).toMatchSnapshot();
  wrapper.debug();
});
