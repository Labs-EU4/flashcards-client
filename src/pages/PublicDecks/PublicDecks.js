import React from "react";
import List from "../../components/ListDeckInfo/DeckList";
import Header from "../../components/ListDeckInfo/HeaderSearchBar";
import styles from "./PublicDecks.module.css";
import Dashboard from "../../layout/Dashboard/Dashboard";

export function PublicDecks() {
  return (
    <div className={styles.public}>
      <Header page={"Public Decks"} />
      <List requestAddrs={"/decks/public"} />
    </div>
  );
}

export default function Public() {
  return (
    <Dashboard>
      <PublicDecks />
    </Dashboard>
  );
}
