import React, {useState, useEffect} from "react";
import {getAllDecks} from "../../state/actions/decks/decksActions";
import {connect} from "react-redux";
import styles from "./DeckLibrary.module.css";
import {Link} from "react-router-dom";
import {Card, Icon} from "antd";

export function DeckLibrary() {
  const [decks, setDecks] = useState([{}]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("hi");

    getAllDecks()();
  }, []);

  return (
    <div className={styles.deckLibraryContainer} data-testid="LibraryContainer">
      <h1>This is deck library</h1>
      {decks.map(deck => {
        return (
          <Card
            role="deck"
            data-testid={`Card${deck.deck_id}`}
            key={deck.deck_id}
            actions={[
              <Link to={`/decks/${deck.deck_id}`}>
                <Icon style={{color: "rgba(14,12,12,.60)"}} type="edit" key="edit" />
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

export default connect(state => state, {getAllDecks})(DeckLibrary);
