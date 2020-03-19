import React from "react";
import Cards from "./Cards";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {Provider} from "react-redux";
import store from "../../state/store";
import {BrowserRouter} from "react-router-dom";

let wrapper;
let AddCard = () => wrapper.queryByText("Add a card");
let DeckName = () => wrapper.queryByText("Deck name");

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

describe("Card component", () => {
  it("renders without crashing", () => {
    expect(wrapper.container).toMatchSnapshot();
  });

  it('renders a "Add a card" text node', () => {
    expect(AddCard()).toBeInTheDocument();
    expect(AddCard()).toBeVisible();
  });

  it('renders a "Deck name" text node', () => {
    expect(DeckName()).toBeInTheDocument();
    expect(DeckName()).toBeVisible();
  });
});
