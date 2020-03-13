import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {TestPersonalDecks} from "./PersonalDecks";

// const mockDecks = [
//   {
//     deck_name: "Test Deck",
//     author: "Test",
//     flashcards: ["test", "the", "flashcards"],
//   },
// ];

const mockGetDecks = jest.fn(() => true);

const PageHeader = () => {
  return wrapper.queryByText("Deck Library");
};

const NoDecksMessage = () => {
  return wrapper.queryByText("You have no decks right now");
};

let wrapper;
beforeEach(() => {
  wrapper = rtl.render(<TestPersonalDecks getPersonalDecks={mockGetDecks} decks={[]} />);
});

it("renders without crashing", () => {
  expect(wrapper.container).toMatchSnapshot();
});

it("displays the right text", () => {
  expect(PageHeader()).toBeInTheDocument();
  expect(NoDecksMessage()).toBeInTheDocument();
});

afterEach(rtl.cleanup);
