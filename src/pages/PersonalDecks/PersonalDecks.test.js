import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {PersonalDecks} from "./PersonalDecks";
import {Provider} from "react-redux";
import store from "../../state/store";

let wrapper;
beforeEach(() => {
  wrapper = rtl.render(
    <Provider store={store}>
      <PersonalDecks />
    </Provider>
  );
});

it("renders without crashing", () => {
  expect(wrapper.container).toMatchSnapshot();
});
