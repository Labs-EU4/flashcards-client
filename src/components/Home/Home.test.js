import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Home from "./Home";
import {Provider} from "react-redux";
import store from "../../state/store";
import {BrowserRouter} from "react-router-dom";

let wrapper;
beforeEach(() => {
  wrapper = rtl.render(
    <Provider store={store}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </Provider>
  );
});

afterEach(rtl.cleanup);

it("should take a snapshot", () => {
  expect(wrapper.container).toMatchSnapshot();
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
