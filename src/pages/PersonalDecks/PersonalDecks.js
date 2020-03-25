import React, {useEffect} from "react";
import List from "../../components/ListDeckInfo/DeckList";
import Header from "../../components/ListDeckInfo/HeaderSearchBar";
import styles from "./PersonalDecks.module.css";
import Dashboard from "../../layout/Dashboard/Dashboard";
import {getAllPersonalDecks} from "../../state/actions/decks";
import {connect} from "react-redux";

export function TestPersonalDecks({getAllPersonalDecks, decks}) {
  useEffect(() => {
    getAllPersonalDecks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.personal}>
      <Header page={"Deck Library"} />
      <List decks={decks} />
    </div>
  );
}

export function PersonalDecks({getAllPersonalDecks, decks}) {
  useEffect(() => {
    getAllPersonalDecks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dashboard>
      <div className={styles.personal}>
        <Header page={"Deck Library"} />
        <List decks={decks} page={"personal"} />
      </div>
    </Dashboard>
  );
}

function mapStateToProps(state) {
  return {
    decks: state.deckState.personalDeckState,
  };
}

export default connect(mapStateToProps, {getAllPersonalDecks})(PersonalDecks);
