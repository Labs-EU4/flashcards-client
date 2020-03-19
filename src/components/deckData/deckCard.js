import React, {useState, useEffect} from "react";
import {Card, Avatar, Modal, Button, Form, Input} from "antd";
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
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({visible: false});

  useEffect(() => {
    props.getAllDecks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showModal = () => {
    setState({
      visible: true,
    });
  };

  const handleOk = e => {
    console.log("e.t.v", e.target.value);
    props.updateDeck(props.currentDeckState.deck_id, {name: deckFormValue});
    console.log(props.currentDeckState.deck_id);
    setState({
      visible: false,
    });
  };

  const handleCancel = e => {
    console.log(e);
    setState({
      visible: false,
    });
  };

  const [deckFormValue, setDeckFormValue] = useState("");
  const handleEdit = e => {
    console.log(props);
    setDeckFormValue(e.target.value);
  };

  useEffect(() => {
    if (props.currentDeckState.deck_name) {
      setDeckFormValue(props.currentDeckState.deck_name);
    }
  }, [props.currentDeckState]);

  return (
    <div className={styles.DeckCardContainer}>
      <h1 className={styles.heading}>My Decks</h1>

      {props.personalDeckState.length === 0 ? (
        <h5>You have no decks</h5>
      ) : (
        props.personalDeckState.map(deck => {
          return (
            <div>
              <Card
                style={{width: 300}}
                actions={[
                  <Link to={`/decks/${deck.deck_id}`}>
                    <PlayCircleOutlined key="play" />
                  </Link>,
                  <EditOutlined
                    onClick={async e => {
                      try {
                        await props.getDeckById(deck.deck_id);
                        showModal();
                      } finally {
                      }
                    }}
                    key="edit"
                  />,
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
              <div className="modalDiv">
                <Modal
                  title="Edit Deck"
                  visible={state.visible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <Form>
                    <Form.Item>
                      <Input value={deckFormValue} onChange={handleEdit} />
                    </Form.Item>
                  </Form>
                </Modal>
              </div>
            </div>
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
