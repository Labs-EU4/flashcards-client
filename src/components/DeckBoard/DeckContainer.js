import React, {useEffect} from "react";
import DeckCard from "./DeckCard.js";
import {
  getAllPersonalDecks,
  deleteDeck,
  getDeckById,
  updateDeck,
} from "../../state/actions/decks";
import styles from "./deckCard.module.css";
import {connect} from "react-redux";

export const DeckContainer = ({
  getAllPersonalDecks,
  personalDeckState,
  deleteDeck,
  updateDeck,
}) => {
  useEffect(() => {
    getAllPersonalDecks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.DeckCardContainer}>
      <h1 className={styles.heading}>My Decks</h1>

      {personalDeckState.length === 0 ? (
        <h5>You have no decks</h5>
      ) : (
        personalDeckState.slice(0, 10).map(deck => {
          return (
            <DeckCard
              key={deck.deck_id}
              deleteDeck={deleteDeck}
              updateDeck={updateDeck}
              deck={deck}
            />
          );
        })
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  personalDeckState: state.deckState.personalDeckState,
});

export default connect(mapStateToProps, {
  getAllPersonalDecks,
  deleteDeck,
  getDeckById,
  updateDeck,
})(DeckContainer);
