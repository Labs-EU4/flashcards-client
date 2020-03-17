import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Dashboard from "./Dashboard";
import {BrowserRouter} from "react-router-dom";

let wrapper;
beforeEach(() => {
  wrapper = rtl.render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );
});

afterEach(rtl.cleanup);

it("should take a snapshot", () => {
  expect(wrapper.container).toMatchSnapshot();
});

describe("is the component rendering correctly", () => {
  it("renders the logo", () => {
    let queryValue = wrapper.getByTestId("logo");
    expect(queryValue).toBeInTheDocument();
  });

  it("renders the toggle menu icon", () => {
    let queryValue = wrapper.getByTestId("toggle-icon");
    expect(queryValue).toBeInTheDocument();
  });

  it("renders the menu", () => {
    let queryValue = wrapper.getByTestId("menu");
    expect(queryValue).toBeInTheDocument();
  });

  it("renders the footer", () => {
    let queryValue = wrapper.getByTestId("footer");
    expect(queryValue).toBeInTheDocument();
  });

  // it("renders the logout-button", () => {
  //   let queryValue = wrapper.getByTestId("logout-button");
  //   expect(queryValue).toBeInTheDocument();
  // });
});

// describe("Are the functions working", () => {
//   it("increments counter", () => {
//     const {getByTestId} = rtl.render(<Dashboard />);
//     rtl.fireEvent.click(getByTestId("toggle-icon"));
//     expect(getByTestId("logout-button")).toHaveTextContent("");
//   });
// });
