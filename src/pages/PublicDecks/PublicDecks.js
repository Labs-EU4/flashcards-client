import React, {useEffect} from "react";
import List from "../../components/ListDeckInfo/DeckList";
import Header from "../../components/ListDeckInfo/HeaderSearchBar";
import styles from "./PublicDecks.module.css";
import Dashboard from "../../layout/Dashboard/Dashboard";
import {getPublicDecks} from "../../state/actions/decks";
import {connect} from "react-redux";

export function TestPublicDecks({getPublicDecks, decks}) {
  useEffect(() => {
    getPublicDecks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.public}>
      <Header page={"Public Decks"} />
      <List decks={decks} />
    </div>
  );
}

export function PublicDecks({getPublicDecks, decks}) {
  useEffect(() => {
    getPublicDecks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dashboard>
      <div className={styles.public}>
        <Header page={"Public Decks"} />
        <List decks={decks} page={"public"} />
      </div>
    </Dashboard>
  );
}

function mapStateToProps(state) {
  return {
    decks: state.deckState.publicDeckState,
  };
}

export default connect(mapStateToProps, {getPublicDecks})(PublicDecks);
