import React, {useEffect} from "react";
import List from "../../components/ListDeckInfo/DeckList";
import Header from "../../components/ListDeckInfo/HeaderSearchBar";
import styles from "./PublicDecks.module.css";
import Dashboard from "../../layout/Dashboard/Dashboard";
import {getPublicDecks} from "../../state/actions/decks";
import {connect} from "react-redux";

export function PublicDecks({getPublicDecks, decks}) {
  useEffect(() => {
    getPublicDecks();
  }, [getPublicDecks]);

  return (
    <div className={styles.public}>
      <Header page={"Public Decks"} />
      <List decks={decks} />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    decks: state.publicDeckState,
  };
}

const ConnectedDecksPage = connect(mapStateToProps, {getPublicDecks})(PublicDecks);

export default function Public() {
  return (
    <Dashboard>
      <ConnectedDecksPage />
    </Dashboard>
  );
}
