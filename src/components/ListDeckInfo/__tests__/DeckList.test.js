import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DecksList from "../DeckList";
import {BrowserRouter} from "react-router-dom";

const DeckCard = () => {
  return wrapper.queryByTestId("deck_card_container");
};

const mockDecks = [
  {
    deck_name: "Test Deck",
    author: "Test",
    flashcards: ["test", "the", "flashcards"],
    deck_id: 1,
  },
];

let wrapper;
beforeEach(() => {
  wrapper = rtl.render(
    <BrowserRouter>
      <DecksList decks={mockDecks} />
    </BrowserRouter>
  );
});

it("renders without crashing", async () => {
  expect(wrapper.container).toMatchSnapshot();
  expect(await rtl.waitForElement(() => DeckCard())).toBeInTheDocument();
});
