import React, {useEffect} from "react";
import DeckCard from "./DeckCard";
import {getDecks} from "../../state/actions/decks";
import {connect} from "react-redux";
import styles from "./DeckList.module.css";

export function DecksList({requestAddrs, getDecks, decks}) {
  useEffect(() => {
    getDecks(requestAddrs);
  }, [getDecks, requestAddrs]);

  return (
    <div className={styles.main_content}>
      {decks.length > 0 ? (
        decks.map(deck => {
          return <DeckCard deck={deck} />;
        })
      ) : (
        <h2>You have no decks right now</h2>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    decks: state.deckState,
  };
}

const ConnectedDeckList = connect(mapStateToProps, {getDecks})(DecksList);

export default ConnectedDeckList;
