import React from "react";
import {connect} from "react-redux";
import {createDeck} from "../../state/actions/decks";
import DeckForm from "../DeckBoard/DeckForm";

export function NewDeckFormContainer({createDeck, history}) {
  return <DeckForm submitAction={createDeck} history={history} />;
}

const connectedContainer = connect(null, {createDeck})(NewDeckFormContainer);
export default connectedContainer;
