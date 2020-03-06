import React from "react";
import List from "../../components/ListDeckInfo/DeckList";
import Header from "../../components/ListDeckInfo/HeaderSearchBar";

export default function PublicDecks() {
  return (
    <div style={{backgroundColor: "gray"}}>
      <Header page={"Public Decks"} />
      <List requestAddrs={"http://localhost:4003/api/decks/public"} />
    </div>
  );
}
