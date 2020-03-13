import React, {useState, useEffect} from "react";
import {Card, Avatar} from "antd";
import {getAllDecks, deleteDeck} from "../../state/actions/decks/decksActions";
import {EditOutlined, DeleteOutlined, PlayCircleOutlined} from "@ant-design/icons";
import styles from "./deckCard.module.css";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

const {Meta} = Card;

const DeckCard = props => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    props.getAllDecks();
  }, [props]);
  console.log(props.deckState.userDecks);

  return (
    <div className={styles.DeckCardContainer}>
      <h1 className={styles.MyDecks}>My Decks</h1>

      {props.deckState.userDecks.length === 0 ? (
        <h5>You have no decks</h5>
      ) : (
        props.deckState.userDecks.map(deck => {
          return (
            <Card
              style={{width: 300}}
              actions={[
                <Link to={`/decks/${deck.deck_id}`}>
                  <PlayCircleOutlined key="play" />
                </Link>,
                <EditOutlined key="edit" />,
                <DeleteOutlined
                  onClick={e => props.deleteDeck(deck.deck_id)}
                  key="delete"
                />,
              ]}
              loading={loading}
              className={styles.deckCard}
            >
              <Meta
                avatar={<Avatar src="logo192.png" />}
                description={deck.deck_name}
                cardNumber="52"
              />
            </Card>
          );
        })
      )}
    </div>
  );
};

export default connect(state => state, {getAllDecks, deleteDeck})(DeckCard);
