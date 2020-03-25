import React, {useEffect, useState} from "react";
import {Card, Button, Icon, Modal, Avatar} from "antd";
import {getCards, deleteCard, getDeckId} from "../../state/actions/CardAction";
import {connect} from "react-redux";
import styles from "./AddCard.module.css";
import HeaderSearchBar from "../ListDeckInfo/HeaderSearchBar";
import AddCard from "./AddCard";
import UpdateCard from "./UpdateCard";
import {useParams} from "react-router";
import {useHistory} from "react-router-dom";

const {Meta} = Card;

function Cards(props) {
  let history = useHistory();
  let {id} = useParams();
  let [card, setCard] = useState({});
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);

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
  console.log(history);
  return (
    //   Map the fetched cards to an ant design cards component for display on the browser
    <div className={styles.componentcontainer}>
      <div className={styles.container}>
        <div className={styles.completeHeader}>
          <div className={styles.headercontainer}>
            <p className={styles.deckName}>{props.currentDeck.deck_name}</p>
            <HeaderSearchBar />
          </div>
          <Button className={styles.btn} type="dashed" onClick={toggleMode}>
            Add a card
          </Button>
        </div>
        <div className={styles.mainContent}>
          <div className={styles.mappedCard}>
            {props.currentDeck.flashcards && props.currentDeck.flashcards.length > 0 ? (
              props.currentDeck.flashcards.map(currentCard => {
                if (currentCard === null) {
                  return null;
                } else {
                  return (
                    <div className={styles.card}>
                      <Card
                        data-testid="cardHolder"
                        style={{width: "100%", border: "1px solid blue"}}
                        className={styles.innerCard}
                        actions={
                          history.location.state.source === "personal"
                            ? [
                                <Icon
                                  type="delete"
                                  onClick={() => handleDelete(currentCard.id)}
                                />,
                                <Icon
                                  type="edit"
                                  onClick={() => toggleModal(currentCard)}
                                />,
                              ]
                            : null
                        }
                      >
                        <Meta
                          title={currentCard.question}
                          description={currentCard.answer}
                        />
                      </Card>
                    </div>
                  );
                }
              })
            ) : (
              <h1 className={styles.nocards}>There are no cards to display</h1>
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
    </div>
  );
}

function mapStateToProps(state) {
  return {
    currentDeck: state.deckState.currentDeckState,
  };
}

export default connect(mapStateToProps, {getCards, deleteCard, getDeckId})(Cards);
