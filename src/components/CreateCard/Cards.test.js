import React from "react";
import Cards from "./Cards";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {Provider} from "react-redux";
import store from "../../state/store";
import {BrowserRouter} from "react-router-dom";

let wrapper;
beforeEach(() => {
  wrapper = rtl.render(
    <Provider store={store}>
      <BrowserRouter>
        <Cards />
      </BrowserRouter>
    </Provider>
  );
});
// setup the cleanup
afterEach(rtl.cleanup);

it("renders without crashing", () => {
  expect(wrapper.container).toMatchSnapshot();
});
