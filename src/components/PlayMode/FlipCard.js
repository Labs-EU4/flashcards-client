import React from "react";
import * as styles from "./PlayMode.module.less";

export default function FlipCard({card, showAnswer, revealAnswer}) {
  return (
    <div className={styles.card_block}>
      <div className="scene" onClick={revealAnswer}>
        <div className={`card${showAnswer ? " is-flipped" : ""}`}>
          <h1 className="card__face card__face--front">{card.question}</h1>
          <h1 className="card__face card__face--back">{card.answer}</h1>
        </div>
      </div>
    </div>
  );
}
