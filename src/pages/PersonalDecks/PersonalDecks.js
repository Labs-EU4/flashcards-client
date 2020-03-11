import React from "react";
import List from "../../components/ListDeckInfo/DeckList";
import Header from "../../components/ListDeckInfo/HeaderSearchBar";
import styles from "./PersonalDecks.module.css";
import Dashboard from "../../layout/Dashboard/Dashboard";

export function PersonalDecks() {
  return (
    <div className={styles.public}>
      <Header page={"Deck Library"} />
      <List requestAddrs={"/decks"} />
    </div>
  );
}

export default function Personal() {
  return (
    <Dashboard>
      <PersonalDecks />
    </Dashboard>
  );
}
