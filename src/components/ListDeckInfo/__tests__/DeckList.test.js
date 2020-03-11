import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {DecksList} from "../DeckList";

const NoDecksMessage = () => {
  return wrapper.queryByText("You have no decks right now");
};

const DeckCard = () => {
  return wrapper.queryByTestId("deck_card_container");
};

jest.mock("../../../utils/axios", () => {
  return {
    axiosWithAuth: jest.fn(() => {
      return {
        get: jest.fn().mockResolvedValue({
          data: {
            data: [
              {
                deck_name: "Test Deck",
                author: "John Doe",
                flashcards: ["just", "mock", "data"],
              },
            ],
          },
        }),
      };
    }),
  };
});

const mockGetDecks = jest.fn(() => true);

const mockDecks = [
  {
    deck_name: "Test Deck",
    author: "Test",
    flashcards: ["test", "the", "flashcards"],
  },
];

let wrapper;
beforeEach(() => {
  wrapper = rtl.render(
    <DecksList requestAddrs="/test" getDecks={mockGetDecks} decks={mockDecks} />
  );
});

it("renders without crashing", async () => {
  expect(wrapper.container).toMatchSnapshot();
  // expect(DeckCard()).toBeInTheDocument();
  expect(await rtl.waitForElement(() => DeckCard())).toBeInTheDocument();
});
