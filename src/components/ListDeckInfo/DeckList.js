import React from "react";
import DeckCard from "./DeckCard";
import styles from "./DeckList.module.css";

export default function DecksList({decks}) {
  return (
    <div className={styles.main_content}>
      {decks.length > 0 ? (
        decks.map((deck, index) => {
          return <DeckCard deck={deck} key={index} />;
        })
      ) : (
        <h2>You have no decks right now</h2>
      )}
    </div>
  );
}
