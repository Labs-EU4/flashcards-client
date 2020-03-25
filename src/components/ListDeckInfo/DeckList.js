import React from "react";
import DeckCard from "./DeckCard";
import styles from "./DeckList.module.css";

export default function DecksList({decks, page}) {
  return (
    <div className={styles.main_content}>
      {decks.length > 0 ? (
        decks.map(deck => {
          return <DeckCard deck={deck} key={deck.deck_id} page={page} />;
        })
      ) : (
        <h2 className={styles.noName}>You have no decks right now</h2>
      )}
    </div>
  );
}
