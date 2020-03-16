import React, {useEffect} from "react";
import List from "../../components/ListDeckInfo/DeckList";
import Header from "../../components/ListDeckInfo/HeaderSearchBar";
import styles from "./PersonalDecks.module.css";
import Dashboard from "../../layout/Dashboard/Dashboard";
import {getPersonalDecks} from "../../state/actions/decks";
import {connect} from "react-redux";

export function TestPersonalDecks({getPersonalDecks, decks}) {
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

export function PersonalDecks({getPersonalDecks, decks}) {
  useEffect(() => {
    getPersonalDecks();
  }, [getPersonalDecks]);

  return (
    <Dashboard>
      <div className={styles.personal}>
        <Header page={"Deck Library"} />
        <List decks={decks} />
      </div>
    </Dashboard>
  );
}

function mapStateToProps(state) {
  return {
    decks: state.personalDeckState,
  };
}

export default connect(mapStateToProps, {getPersonalDecks})(PersonalDecks);

// export default function Personal() {
//   return (
//     <Dashboard>
//       <ConnectedDecksPage />
//     </Dashboard>
//   );
// }
