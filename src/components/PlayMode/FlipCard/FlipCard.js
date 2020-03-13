import React from "react";
import "./FlipCard.css";
export default function FlipCard({card, showAnswer, revealAnswer}) {
  return (
    <div>
      <div className="scene" onClick={revealAnswer}>
        <div className={`card${showAnswer ? " is-flipped" : ""}`}>
          <h1 className="card__face card__face--front">{card.question}</h1>
          <h1 className="card__face card__face--back">{card.answer}</h1>
        </div>
      </div>
    </div>
  );
}
