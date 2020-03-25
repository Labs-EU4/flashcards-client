import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {TestPersonalDecks, PersonalDecks} from "./PersonalDecks";
import {Provider} from "react-redux";
import store from "../../state/store";
import {BrowserRouter} from "react-router-dom";

const mockGetDecks = jest.fn(() => true);

const PageHeader = () => {
  return wrapper.queryByText("Deck Library");
};

const NoDecksMessage = () => {
  return wrapper.queryByText("You have no decks right now");
};

let wrapper;
beforeEach(() => {
  wrapper = rtl.render(
    <TestPersonalDecks getAllPersonalDecks={mockGetDecks} decks={[]} />
  );
});

it("renders without crashing", () => {
  expect(wrapper.container).toMatchSnapshot();
});

it("displays the right text", () => {
  expect(PageHeader()).toBeInTheDocument();
  expect(NoDecksMessage()).toBeInTheDocument();
});

it("renders without crashing v2", () => {
  const wrapper2 = rtl.render(
    <Provider store={store}>
      <BrowserRouter>
        <PersonalDecks getAllPersonalDecks={mockGetDecks} decks={[]} />
      </BrowserRouter>
    </Provider>
  );
  expect(wrapper2.container).toMatchSnapshot();
});

afterEach(rtl.cleanup);
