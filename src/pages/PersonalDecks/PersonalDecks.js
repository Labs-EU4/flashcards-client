import React from "react";
import List from "../../components/ListDeckInfo/DeckList";
import Header from "../../components/ListDeckInfo/HeaderSearchBar";
import styles from "./PersonalDecks.module.css";

export default function PublicDecks() {
  return (
    <div className={styles.public}>
      <Header page={"Deck Library"} />
      <List requestAddrs={"/decks"} />
    </div>
  );
}
