import React, {useEffect, useState} from "react";
import {axiosWithAuth} from "../../utils/axios";
import {Card, Button, Icon, Modal, Input, Select, Avatar, Spin} from "antd";
import {getCards, deleteCard, getDeckId} from "../../state/actions/CardAction";
import {connect} from "react-redux";
import styles from "./AddCard.module.css";
import HeaderSearchBar from "../ListDeckInfo/HeaderSearchBar";
import Dashboard from "../../layout/Dashboard/Dashboard";
import AddCard from "./AddCard";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";
import UpdateCard from "./UpdateCard";

const {Meta} = Card;
const Search = Input.Search;
const Option = Select.Option;

function Cards(props) {
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleCancel() {
    setVisible(false);
  }

  function handleAdd() {
    setShow(false);
  }

  function toggleModal() {
    setVisible(!visible);
  }

  function toggleMode() {
    setShow(!show);
  }

  //   Fetch cards after authentication
  useEffect(() => {
    props.getDeckId(1);
    console.log(props.currentDeck.flashcards);
  }, [props]);

  // Function for deleting cards
  const handleDelete = id => {
    props.deleteCard(id);
    props.history.push("/cards");
  };

  return (
    <div className={styles.cardContainer}>
      {/* <Dashboard/> */}
      <div className={styles.header}>
        <p className={styles.deckName}>Deck name</p>
        <HeaderSearchBar />
        <Button className={styles.btn} type="dashed" onClick={toggleMode}>
          Add a card
        </Button>
      </div>
      <div className={styles.mainContent}>
        <Dashboard />
        <div className={styles.mappedCard}>
          {/* Map the fetched cards to an ant design cards component for display on the
          browser */}
          {props.currentDeck.flashcards && props.currentDeck.flashcards.length !== 0 ? (
            props.currentDeck.flashcards.map(currentCard => {
              return (
                <div className={styles.card}>
                  <Card
                    data-testid="cardHolder"
                    style={{width: "100%", marginTop: "16px", marginRight: "10px"}}
                    className={styles.innerCard}
                    actions={[
                      <DeleteOutlined
                        key="delete"
                        onClick={() => handleDelete(currentCard.id)}
                      />,
                      <EditOutlined onClick={toggleModal} />,
                    ]}
                  >
                    <Meta
                      avatar={<Avatar src="logo192.png" />}
                      title={currentCard.question}
                      description={currentCard.answer}
                    />
                  </Card>
                  <Modal
                    title="Are you sure you want to edit this card?"
                    visible={visible}
                    footer={null}
                    // onOk={handleOk}
                    onCancel={handleCancel}
                  >
                    <UpdateCard toggleModal={toggleModal} cardId={currentCard.id} />
                  </Modal>
                </div>
              );
            })
          ) : (
            <h1>THERE ARE NO CARDS TO DISPLAY</h1>
          )}
        </div>
      </div>
      <div className={styles.cardDeck}>
        {/* <div className={styles.container}> */}
        {/* <div className={styles.title}>
              
            
            </div> */}
        {/* <Spin spinning={loading} delay={300}></Spin> */}
        <Modal title="Want a new card?" visible={show} footer={null} onCancel={handleAdd}>
          <AddCard toggleMode={toggleMode} />
        </Modal>
      </div>
      {/* </div> */}
      {/* </Dashboard> */}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    currentDeck: state.deckState.currentDeckState,
  };
}

export default connect(mapStateToProps, {getCards, deleteCard, getDeckId})(Cards);
