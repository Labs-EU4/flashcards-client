import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DeckCard from "../DeckCard";
import {BrowserRouter} from "react-router-dom";

let mockDeck = {
  deck_name: "Test Deck",
  author: "John Doe",
  flashcards: ["just", "mock", "data"],
  deck_id: 1,
};

const DeckName = () => {
  return wrapper.queryByTestId("deck_name");
};

const Author = () => {
  return wrapper.queryByTestId("author");
};

const FlashcardsCount = () => {
  return wrapper.queryByTestId("flashcards_count");
};

const MoreOptions = () => {
  return wrapper.queryByTestId("more_options");
};

const Popover = () => {
  return wrapper.queryByTestId("popover");
};

const LikeButton = () => {
  return wrapper.queryByTestId("like");
};

const DislikeButton = () => {
  return wrapper.queryByTestId("dislike");
};

let wrapper;
beforeEach(() => {
  wrapper = rtl.render(
    <BrowserRouter>
      <DeckCard deck={mockDeck} />
    </BrowserRouter>
  );
});

it("renders without crashing", () => {
  expect(wrapper.container).toMatchSnapshot();
});

it("displays elements correctly", () => {
  expect(DeckName()).toBeInTheDocument();
  expect(DeckName()).toHaveTextContent("Test Deck");
  expect(Author()).toBeInTheDocument();
  expect(Author()).toHaveTextContent("Author: John Doe");
  expect(FlashcardsCount()).toBeInTheDocument();
  expect(FlashcardsCount()).toHaveTextContent("No. of Cards: 3");
  expect(MoreOptions()).toBeInTheDocument();
  expect(LikeButton()).toBeInTheDocument();
  expect(DislikeButton()).toBeInTheDocument();
  expect(Popover()).not.toBeInTheDocument();
});
