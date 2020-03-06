import React from "react";
import List from "../../components/ListDeckInfo/DeckList";
import Header from "../../components/ListDeckInfo/HeaderSearchBar";
import styles from "./PublicDecks.module.css";

export default function PublicDecks() {
  return (
    <div className={styles.public}>
      <Header page={"Public Decks"} />
      <List requestAddrs={"/decks/public"} />
    </div>
  );
}
