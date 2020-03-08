import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DeckList from "../DeckList";

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

let wrapper;
beforeEach(() => {
  wrapper = rtl.render(<DeckList requestAddrs="/test" />);
});

it("renders without crashing", async () => {
  expect(wrapper.container).toMatchSnapshot();
  // expect(DeckCard()).toBeInTheDocument();
  expect(await rtl.waitForElement(() => DeckCard())).toBeInTheDocument();
});
