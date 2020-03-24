import React from "react";
import {render, screen, act} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {RecentDecks} from "./RecentDecks";
import {BrowserRouter} from "react-router-dom";

test("calls getRecentDecks and renders decks", async () => {
  const promise = Promise.resolve();
  const getDecks = jest.fn(() => promise);
  render(
    <BrowserRouter>
      <RecentDecks recentDecks={deckData} getRecentDecks={getDecks} />
    </BrowserRouter>
  );

  expect(getDecks).toHaveBeenCalledTimes(1);

  await act(() => promise);
});
test("Renders a message if there are no recent decks", async () => {
  const promise = Promise.resolve();
  const getDecks = jest.fn(() => promise);
  render(
    <BrowserRouter>
      <RecentDecks recentDecks={[]} getRecentDecks={getDecks} />
    </BrowserRouter>
  );

  expect(screen.getByText("You haven't completed a session yet!")).toBeVisible();

  await act(() => promise);
});

var deckData = [
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
