import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DecksList from "../DeckList";

const NoDecksMessage = () => {
  return wrapper.queryByText("You have no decks right now");
};

const DeckCard = () => {
  return wrapper.queryByTestId("deck_card_container");
};

const mockDecks = [
  {
    deck_name: "Test Deck",
    author: "Test",
    flashcards: ["test", "the", "flashcards"],
  },
];

let wrapper;
beforeEach(() => {
  wrapper = rtl.render(<DecksList decks={mockDecks} />);
});

it("renders without crashing", async () => {
  expect(wrapper.container).toMatchSnapshot();
  // expect(DeckCard()).toBeInTheDocument();
  expect(await rtl.waitForElement(() => DeckCard())).toBeInTheDocument();
});
