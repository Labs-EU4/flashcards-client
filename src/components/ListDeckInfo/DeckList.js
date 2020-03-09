import React, {useEffect, useState} from "react";
import {axiosWithAuth} from "../../utils/axios";
import DeckCard from "./DeckCard";

export default function DecksList({requestAddrs}) {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get(requestAddrs)
      .then(res => {
        console.log(res);
        // setDecks(
        //   res.data.data.filter(deck => {
        //     return deck.flashcards[0] !== null;
        //   })
        // );
        setDecks(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [requestAddrs]);

  return (
    <div>
      {/* {console.log(decks)}
      {decks.map(deck => {
        if (deck.flashcards.length >= 1) {
          return <DeckCard deck={deck} />;
        }
      })} */}
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
