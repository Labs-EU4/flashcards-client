import React from "react";
import * as rtl from "@testing-library/react";
import EditForm from "../EditForm";
import {act} from "react-dom/test-utils";
import * as actions from "../../../state/actions/decks";

//Dispatch mock
const mockDispatch = jest.fn().mockResolvedValue("YAY!");
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

//Action mock
const mockUpdateDeck = jest.fn();
jest.mock("../../../state/actions/decks");
actions.updateDeck = mockUpdateDeck;
// cleaning up
afterEach(() => {
  rtl.cleanup();
});

let wrapper;
const setVisibleMock = jest.fn();
beforeEach(() => {
  wrapper = rtl.render(<EditForm deckValues={deck} setVisible={setVisibleMock} />);
});

describe("is the component rendering correctly", () => {
  it("renders the form placeholder", () => {
    let queryValue = wrapper.getByText(/YABADDABA/);
    expect(queryValue).toBeInTheDocument();
  });

  it("renders the button", () => {
    let button = wrapper.getByText(/^Update Deck$/i);
    expect(button).toBeInTheDocument();
  });

  it("renders the checkbox", () => {
    let input = wrapper.getByTestId("inputCheck");
    expect(input).toBeInTheDocument();
  });

  it("renders the checkbox", () => {
    let input = wrapper.getByTestId("inputSelect");
    expect(input).toBeInTheDocument();
  });
});

describe("form starts with passed initial values", () => {
  it("shows the deck name", () => {
    const startingName = wrapper.getByText(/YABADDABA/);
    expect(startingName).toBeInTheDocument();
  });
  it("shows the initial tags", () => {
    const tag1 = wrapper.getByText(/Agriculture & Forestry/);
    const tag2 = wrapper.getByText(/American Studies/);
    const tag3 = wrapper.getByText(/Anatomy & Physiology/);
    expect(tag1).toBeInTheDocument();
    expect(tag2).toBeInTheDocument();
    expect(tag3).toBeInTheDocument();
  });
  it("Calls the updateDeck action with right arguments on submit", () => {
    const button = wrapper.getByTestId(/button/);
    act(() => {
      rtl.fireEvent.click(button);
    });
    expect(mockUpdateDeck.mock.calls[0]).toMatchInlineSnapshot(`
      Array [
        3,
        Object {
          "addTags": Array [],
          "isPublic": "0",
          "name": "YABADDABA",
          "removeTags": Array [],
        },
      ]
    `);
  });
});

var deck = {
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
};
