import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Home from "./Home";
import {BrowserRouter} from "react-router-dom";

let wrapper;
beforeEach(() => {
  wrapper = rtl.render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
});

afterEach(rtl.cleanup);

it("should take a snapshot", () => {
  expect(wrapper.container).toMatchSnapshot();
});
