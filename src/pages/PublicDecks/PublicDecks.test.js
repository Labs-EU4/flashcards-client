import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {PublicDecks} from "./PublicDecks";
import {Provider} from "react-redux";
import store from "../../state/store";

const PageHeader = () => {
  return wrapper.queryByText("Public Decks");
};

const NoDecksMessage = () => {
  return wrapper.queryByText("You have no decks right now");
};

let wrapper;
beforeEach(() => {
  wrapper = rtl.render(
    <Provider store={store}>
      <PublicDecks />
    </Provider>
  );
});

it("renders without crashing", () => {
  expect(wrapper.container).toMatchSnapshot();
});

it("displays the right text", () => {
  expect(PageHeader()).toBeInTheDocument();
  expect(NoDecksMessage()).toBeInTheDocument();
});

afterEach(rtl.cleanup);
