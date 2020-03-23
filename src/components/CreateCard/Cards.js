import React, {useEffect, useState} from "react";
import {Card, Button, Icon, Modal, Input, Select, Avatar, Spin} from "antd";
import {getCards, deleteCard, getDeckId} from "../../state/actions/CardAction";
import {connect} from "react-redux";
import styles from "./AddCard.module.css";
import HeaderSearchBar from "../ListDeckInfo/HeaderSearchBar";
import Dashboard from "../../layout/Dashboard/Dashboard";
import AddCard from "./AddCard";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";
import UpdateCard from "./UpdateCard";
import {useParams} from "react-router";

const {Meta} = Card;

function Cards(props) {
  console.log(props);
  let {id} = useParams();
  console.log(id, "params id");
  let [card, setCard] = useState({});
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleCancel() {
    setVisible(false);
  }

  function handleAdd() {
    setShow(false);
  }

  async function toggleModal(current) {
    await setCard(current);
    setVisible(!visible);
  }

  function toggleMode() {
    setShow(!show);
  }

  //   Fetch cards after authentication
  useEffect(() => {
    props.getDeckId(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function for deleting cards
  const handleDelete = id => {
    props.deleteCard(id);
  };

  return (
    //   Map the fetched cards to an ant design cards component for display on the browser
    <Dashboard className>
      <div>
        <div className={styles.header}>
          <p className={styles.deckName}>{props.currentDeck.deck_name}</p>
          <HeaderSearchBar />
          <Button className={styles.btn} type="dashed" onClick={toggleMode}>
            Add a card
          </Button>
        </div>
        <div className={styles.mainContent}>
          <div className={styles.mappedCard}>
            {props.currentDeck.flashcards && props.currentDeck.flashcards[0] !== null ? (
              props.currentDeck.flashcards.map(currentCard => {
                if (currentCard === null) {
                  return null;
                } else {
                  return (
                    <div className={styles.card}>
                      <Card
                        data-testid="cardHolder"
                        style={{width: "100%", marginTop: 16}}
                        className={styles.innerCard}
                        actions={[
                          <DeleteOutlined
                            key="delete"
                            onClick={() => handleDelete(currentCard.id)}
                          />,
                          <EditOutlined onClick={() => toggleModal(currentCard)} />,
                        ]}
                      >
                        <Meta
                          avatar={<Avatar src="logo192.png" />}
                          title={currentCard.question}
                          description={currentCard.answer}
                        />
                      </Card>
                    </div>
                  );
                }
              })
            ) : (
              <h1>THERE ARE NO CARDS TO DISPLAY</h1>
            )}
          </div>
        </div>
      </div>

      <div className={styles.cardDeck}>
        <Modal
          title="Want a new card?"
          visible={show}
          footer={null}
          destroyOnClose={true}
          onCancel={handleAdd}
        >
          <AddCard toggleMode={toggleMode} />
        </Modal>
        <Modal
          title="Are you sure you want to edit this card?"
          visible={visible}
          footer={null}
          destroyOnClose={true}
          onCancel={handleCancel}
        >
          <UpdateCard toggleModal={toggleModal} card={card} />
        </Modal>
      </div>
    </Dashboard>
  );
}

function mapStateToProps(state) {
  return {
    currentDeck: state.deckState.currentDeckState,
  };
}

export default connect(mapStateToProps, {getCards, deleteCard, getDeckId})(Cards);
