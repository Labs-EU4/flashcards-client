import React from "react";
import {render, screen} from "@testing-library/react";
import {PlayMode} from "./PlayMode";

beforeEach(() => {
  // when the error's thrown a bunch of console.errors are called even though
  // the error boundary handles the error. This makes the test output noisy,
  // so we'll mock out console.error
  jest.spyOn(console, "error");
  console.error.mockImplementation(() => {});
});
afterEach(() => {
  console.error.mockRestore();
});

test("It renders", () => {
  // Arrange
  render(
    <PlayMode
      deckInPlaySession={deckData}
      clearDeckInPlaySession={() => null}
      storeUnfinishedSession={() => null}
      history={() => null}
      touchDeck={() => null}
      fetchDeckById={jest.fn().mockResolvedValue(10)}
      match={{params: {id: 1}}}
    />
  );
  // Act

  // Assert
  expect(screen.getByText(/What is data mining?/i)).toBeInTheDocument();
});

var deckData = {
  deck_id: 1,
  user_id: 1,
  deck_name: "Statistical Learning",
  public: true,
  created_at: "2020-03-05T10:31:48.748Z",
  updated_at: "2020-03-05T10:31:48.748Z",
  tags: [
    {
      id: 1,
      name: "Accounting & Finance",
    },
    {
      id: 2,
      name: "Aeronautical & Manufacturing Engineering",
    },
  ],
  flashcards: [
    {
      id: 1,
      deck_id: 1,
      user_id: 1,
      question: "What is data mining?",
      answer: "Its when biotech and infotech merge and people become data mines",
      created_at: "2020-01-08T10:44:38.761+00:00",
      updated_at: "2020-01-08T10:44:38.761+00:00",
    },
    {
      id: 2,
      deck_id: 1,
      user_id: 1,
      question: "Hey Anna hehe sup",
      answer: "How you doing?",
      created_at: "2020-01-08T10:45:05.269+00:00",
      updated_at: "2020-01-08T10:45:05.269+00:00",
    },
  ],
};
