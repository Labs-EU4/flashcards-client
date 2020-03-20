import React from "react";
import {render, screen} from "@testing-library/react";
import {DeckContainer} from "../DeckContainer";
import {BrowserRouter} from "react-router-dom";
const deckData = [
  {
    deck_id: 3,
    user_id: 2,
    deck_name: "YABADDABA",
    public: false,
    created_at: "2020-03-16T10:17:24.649Z",
    updated_at: "2020-03-16T10:17:24.649Z",
    tags: [
      {
        id: 3,
        name: "Agriculture & Forestry",
      },
      {
        id: 4,
        name: "American Studies",
      },
      {
        id: 5,
        name: "Anatomy & Physiology",
      },
    ],
    flashcards: [
      {
        id: 3,
        deck_id: 2,
        user_id: 2,
        question: "Which of the following is used in pencils?",
        answer: "Graphite",
        created_at: "2020-03-16T10:17:24.654483+00:00",
        updated_at: "2020-03-16T10:17:24.654483+00:00",
      },
      {
        id: 4,
        deck_id: 2,
        user_id: 2,
        question:
          "Brass gets discoloured in air because of the presence of which of the following gases in air?",
        answer: "Hydrogen sulphide",
        created_at: "2020-03-16T10:17:24.654483+00:00",
        updated_at: "2020-03-16T10:17:24.654483+00:00",
      },
    ],
  },
  {
    deck_id: 2,
    user_id: 2,
    deck_name: "General Science",
    public: false,
    created_at: "2020-03-16T10:17:24.649Z",
    updated_at: "2020-03-16T10:17:24.649Z",
    tags: [
      {
        id: 3,
        name: "Agriculture & Forestry",
      },
      {
        id: 4,
        name: "American Studies",
      },
      {
        id: 5,
        name: "Anatomy & Physiology",
      },
    ],
    flashcards: [
      {
        id: 3,
        deck_id: 2,
        user_id: 2,
        question: "Which of the following is used in pencils?",
        answer: "Graphite",
        created_at: "2020-03-16T10:17:24.654483+00:00",
        updated_at: "2020-03-16T10:17:24.654483+00:00",
      },
      {
        id: 4,
        deck_id: 2,
        user_id: 2,
        question:
          "Brass gets discoloured in air because of the presence of which of the following gases in air?",
        answer: "Hydrogen sulphide",
        created_at: "2020-03-16T10:17:24.654483+00:00",
        updated_at: "2020-03-16T10:17:24.654483+00:00",
      },
    ],
  },
];

const getAllPersonalDecksMock = jest.fn();

describe("Deck container component", () => {
  test("Calls an action to get decks", () => {
    //Arrange
    render(
      <DeckContainer
        getAllPersonalDecks={getAllPersonalDecksMock}
        personalDeckState={[]}
        deleteDeck={() => null}
        updateDeck={() => null}
      />
    );
    //Assert
    expect(getAllPersonalDecksMock).toHaveBeenCalledTimes(1);
  });
  test("Displays a message if there are no decks", () => {
    //Arrange
    render(
      <DeckContainer
        getAllPersonalDecks={getAllPersonalDecksMock}
        personalDeckState={[]}
        deleteDeck={() => null}
        updateDeck={() => null}
      />
    );
    const warning = screen.getByText(/You have no decks/);
    //Assert
    expect(warning).toBeInTheDocument();
  });
  test("Renders DeckCard components for each deck", () => {
    //Arrange
    render(
      <BrowserRouter>
        <DeckContainer
          getAllPersonalDecks={getAllPersonalDecksMock}
          personalDeckState={deckData}
          deleteDeck={() => null}
          updateDeck={() => null}
        />
      </BrowserRouter>
    );
    const deck1 = screen.getByText(/YABADDABA/);
    const deck2 = screen.getByText(/General Science/);
    expect(deck1).toBeInTheDocument();
    expect(deck2).toBeInTheDocument();
  });
});
