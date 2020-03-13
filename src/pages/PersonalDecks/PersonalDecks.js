import React, {useEffect} from "react";
import List from "../../components/ListDeckInfo/DeckList";
import Header from "../../components/ListDeckInfo/HeaderSearchBar";
import styles from "./PersonalDecks.module.css";
import Dashboard from "../../layout/Dashboard/Dashboard";
import {getPersonalDecks} from "../../state/actions/decks";
import {connect} from "react-redux";

export function PersonalDecks({getPersonalDecks, decks}) {
  useEffect(() => {
    getPersonalDecks();
  }, [getPersonalDecks]);

  return (
    <div className={styles.personal}>
      <Header page={"Deck Library"} />
      <List decks={decks} />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    decks: state.personalDeckState,
  };
}

const ConnectedDecksPage = connect(mapStateToProps, {getPersonalDecks})(Personal);

export default function Personal() {
  return (
    <Dashboard>
      <ConnectedDecksPage />
    </Dashboard>
  );
}
