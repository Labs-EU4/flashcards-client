import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NewDeckForm from "./NewDeckForm";
// cleaning up
afterEach(rtl.cleanup);

let wrapper;

beforeEach(() => {
  wrapper = rtl.render(<NewDeckForm />);
});

// useHistory mock so tests dont crash
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
    location: {
      pathname: "random/text/okay/token",
    },
  }),
  Link: "a",
}));

describe("is the component rendering correctly", () => {
  it("renders the form placeholder", () => {
    let queryValue = wrapper.getByPlaceholderText(/Deckname/);
    expect(queryValue).toBeDefined();
  });

  it("renders the button", () => {
    let button = wrapper.queryByText(/^Create Deck$/i);
    expect(button).toBeDefined();
  });
});

describe("the input field + validation is working", () => {
  it("shows an validation error if deckname is too short", () => {
    rtl.fireEvent.change(wrapper.getByTestId("inputDeckName"), {
      target: {value: "abc"},
    });
    let error = wrapper.queryByText(/Deckname must be atleast 4 characters long/);
    expect(error).toHaveTextContent(/Deckname/i);
  });
});

describe("form renders an alert", () => {
  it("renders that the deck couldnt be created", async () => {
    let input = wrapper.queryByTestId("inputDeckName");
    rtl.fireEvent.change(input, {
      target: {value: "jhkjdsfkjsdfhkjdsfhkjsdfsd"},
    });
    rtl.fireEvent.click(wrapper.queryByTestId("button"));
    let alert = await rtl.waitForElement(() => wrapper.queryByTestId("alertInvalid"));
    expect(alert).toBeInTheDocument();
  });
});

describe("form renders input value", () => {
  it("shows the value put in the first form field", () => {
    let input = wrapper.queryByTestId("inputDeckName");
    rtl.fireEvent.change(input, {
      target: {value: "oidjsajdkasjk"},
    });
    let field = wrapper.queryByTestId("inputDeckName");
    let fieldValue = field.value;
    expect(fieldValue).toBe("oidjsajdkasjk");
  });
});
