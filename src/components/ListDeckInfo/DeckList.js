import React, {useEffect, useState} from "react";
import axiosWithAuth from "../../helpers/axiosWithAuth";
import DeckCard from "./DeckCard";

export default function DecksList() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("http://localhost:4003/api/decks/public")
      .then(res => {
        console.log(res);
        setDecks(
          res.data.data.filter(deck => {
            return deck.flashcards[0] !== null;
          })
        );
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {console.log(decks)}
      {decks.map(deck => {
        if (deck.flashcards.length >= 1) {
          return <DeckCard deck={deck} />;
        }
      })}
    </div>
  );
}
