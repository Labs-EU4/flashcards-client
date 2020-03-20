import React, {useState, useEffect} from "react";
import {Card, Avatar, Modal, Button, Form, Input, Select, Checkbox} from "antd";
import DeckCardd from "./DeckCardd";
import {
  getAllDecks,
  deleteDeck,
  getDeckById,
  updateDeck,
} from "../../state/actions/decks";
import {EditOutlined, DeleteOutlined, PlayCircleOutlined} from "@ant-design/icons";
import styles from "./deckCard.module.css";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {axiosWithAuth} from "../../utils/axios";
import {currentDeckReducer} from "../../state/reducers/decks";

const {Meta} = Card;

const DeckCard = props => {
  const [state, setState] = useState({visible: false});

  useEffect(() => {
    props.getAllDecks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.DeckCardContainer}>
      <h1 className={styles.heading}>My Decks</h1>

      {props.personalDeckState.length === 0 ? (
        <h5>You have no decks</h5>
      ) : (
        props.personalDeckState.map(deck => {
          return (
            <DeckCardd
              key={deck.deck_id}
              deleteDeck={props.deleteDeck}
              updateDeck={props.updateDeck}
              deck={deck}
            />
          );
        })
      )}
    </div>
  );
};

export default connect(state => state, {
  getAllDecks,
  deleteDeck,
  getDeckById,
  updateDeck,
})(DeckCard);
