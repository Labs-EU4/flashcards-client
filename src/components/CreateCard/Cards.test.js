import React from "react";
import Cards from "./Cards";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

// setup the cleanup
afterEach(rtl.cleanup);

it("renders without crashing", () => {
  const wrapper = rtl.render(<Cards />);
  wrapper.debug();
  const editElement = wrapper.queryByText(/edit/i);
  //   assert that the element is there
  expect(editElement).toBeInTheDocument();
});
