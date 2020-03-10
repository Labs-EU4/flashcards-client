import React from "react";
import List from "../../components/ListDeckInfo/DeckList";
import Header from "../../components/ListDeckInfo/HeaderSearchBar";
import styles from "./PublicDecks.module.css";
import Dashboard from "../../layout/Dashboard/Dashboard";

export default function PublicDecks() {
  return (
    <Dashboard>
      <div className={styles.public}>
        <Header page={"Public Decks"} />
        <List requestAddrs={"/decks/public"} />
      </div>
    </Dashboard>
  );
}
