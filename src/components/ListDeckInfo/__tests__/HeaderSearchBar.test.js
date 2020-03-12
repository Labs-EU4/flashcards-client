import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import HeaderSearchBar from "../HeaderSearchBar";

const PageTitile = () => {
  return wrapper.queryByTestId("page");
};

let wrapper;
beforeEach(() => {
  wrapper = rtl.render(<HeaderSearchBar page={"Test"} />);
});

it("renders without crashing", () => {
  expect(wrapper.container).toMatchSnapshot();
});

it("renders page title correctly", () => {
  expect(PageTitile()).toHaveTextContent("Test");
});
