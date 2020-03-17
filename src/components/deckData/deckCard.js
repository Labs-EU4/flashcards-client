import React, {useState, useEffect} from "react";
import {Card, Avatar, Modal, Button, Form, Input} from "antd";
import {getAllDecks, deleteDeck, getDeckById} from "../../state/actions/decks";
import {EditOutlined, DeleteOutlined, PlayCircleOutlined} from "@ant-design/icons";
import styles from "./deckCard.module.css";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

const {Meta} = Card;

const DeckCard = props => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({visible: false});

  useEffect(() => {
    props.getAllDecks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(props.personalDeckState);
  const showModal = () => {
    setState({
      visible: true,
    });
  };

  const handleOk = e => {
    console.log(e);
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

  const [deckFormValue, setDeckFromValue] = useState(props.currentDeckState);
  const handleEdit = e => {
    console.log(props);
    setDeckFromValue(e.target.value);
  };
  return (
    <div className={styles.DeckCardContainer}>
      <h1 className={styles.MyDecks}>My Decks</h1>

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
                    onClick={e => {
                      console.log(deck);
                      showModal();
                      getDeckById(deck.deck_id);
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

export default connect(state => state, {getAllDecks, deleteDeck, getDeckById})(DeckCard);
