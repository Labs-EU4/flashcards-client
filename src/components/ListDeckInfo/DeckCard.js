import React from "react";
import {Card, Icon} from "antd";
import styles from "./DeckList.module.css";

export default function DeckCard({deck}) {
  return (
    <div className={styles.deckCard}>
      <div className={styles.deckOverview}>
        <div>
          <h2>{deck.deck_name}</h2>
          <h3>Author: {deck.author}</h3>
          <h3>No. of Cards: {deck.flashcards.length}</h3>
        </div>
        <div>
          <Icon type="like" style={{color: "rgba(0,0,0,.25)"}} />
          <Icon type="dislike" style={{color: "rgba(0,0,0,.25)"}} />
        </div>
      </div>
      <div className={styles.horizontalList}>
        {deck.flashcards.map(card => {
          return (
            <Card title="Question" className={styles.card}>
              {card.question}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
