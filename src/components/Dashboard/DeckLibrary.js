import React, {useState, useEffect} from "react";
import axiosWithAuth from "../../helpers/axiosWithAuth";
import styles from "./DeckLibrary.module.css";
import {Link} from "react-router-dom";
import {Card, Icon} from "antd";

export default function DeckLibrary() {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosWithAuth()
      .get("http://localhost:4003/api/decks")
      .then(res => {
        console.log(res);
        setDecks(res.data.data);
        return res;
      })
      .then(res => {
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.deckLibraryContainer} data-testid="LibraryContainer">
      {decks.map(deck => {
        return (
          <Card
            role="deck"
            data-testid={`Card${deck.deck_id}`}
            key={deck.deck_id}
            actions={[
              <Link to={`/decks/${deck.deck_id}`}>
                <Icon className={styles.editDeck} type="edit" key="edit" />
              </Link>,
              <Icon type="delete" style={{color: "rgba(14,12,12,.60)"}} key="delete" />,
            ]}
            loading={loading}
            className={styles.deckCard}
          >
            {deck.deck_name}
          </Card>
        );
      })}
    </div>
  );
}
