import React from "react";
import {render, fireEvent, screen} from "@testing-library/react";
import DeckCard from "../DeckCard";
import {BrowserRouter} from "react-router-dom";
import {act} from "react-dom/test-utils";

const deleteDeck = jest.fn();
let props = {deck: {deck_id: 1, deck_name: "BOOP"}, deleteDeck, updateDeck: () => null};

describe("DeckCard component", () => {
  test("Calls on delete action on clicking delete icon", () => {
    //Arrange
    render(
      <BrowserRouter>
        <DeckCard {...props} />
      </BrowserRouter>
    );
    const deleteIcon = screen.getByTestId(/delete/);
    //Act
    act(() => {
      fireEvent.click(deleteIcon);
    });
    //Assert
    expect(deleteDeck).toHaveBeenCalledTimes(1);
    expect(deleteDeck).toHaveBeenCalledWith(1);
  });
  test("Renders correct items", () => {
    //Arrange
    render(
      <BrowserRouter>
        <DeckCard {...props} />
      </BrowserRouter>
    );
    const deleteIcon = screen.getByTestId(/delete/);
    const playIcon = screen.getByTestId(/play/);
    const editIcon = screen.getByTestId(/edit/);
    expect(deleteIcon).toBeInTheDocument();
    expect(playIcon).toBeInTheDocument();
    expect(editIcon).toBeInTheDocument();
  });
});
