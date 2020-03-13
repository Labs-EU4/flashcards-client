import React, {useEffect, useState} from "react";
import {axiosWithAuth} from "../../utils/axios";
import {Card, Button, Icon, Popover, Modal} from "antd";
import {Link} from "react-router-dom";
import {getCards, deleteCard, getDeckId} from "../../state/actions/CardAction";
import {connect} from "react-redux";
import "./AddCard.css";
import HeaderSearchBar from "../ListDeckInfo/HeaderSearchBar";
import Dashboard from "../../layout/Dashboard/Dashboard";
import AddCard from "./AddCard";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";

function Cards(props) {
  // set the cards to state
  // const [cards, setCards] = useState([{}]);

  const [visible, setVisible] = useState(false);

  function showModal() {
    setVisible(true);
  }

  function handleOk() {
    setVisible(false);
  }

  function handleCancel() {
    setVisible(false);
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
    //   Map the fetched cards to an ant design cards component for display on the browser

    <div className="card-div">
      <Dashboard />
      <div className="search-div">
        <h2 className="heading">Deck name</h2>

        <HeaderSearchBar className="search" />
        <Button type="dashed" onClick={showModal}>
          Add a card
        </Button>
        <Modal
          title="Want a new card?"
          visible={visible}
          footer={null}
          // onOk={handleOk}
          onCancel={handleCancel}
        >
          <AddCard history={props.history} />
        </Modal>
      </div>

      <div className="mapped-card">
        {props.currentDeck.flashcards && props.currentDeck.flashcards.length > 0 ? (
          props.currentDeck.flashcards.map(currentCard => {
            return (
              <Card
                // src="logo192.png"
                extra={
                  <Link
                    to={{
                      pathname: `/updatecard`,
                      state: {id: currentCard.id, deckId: currentCard.deck_id},
                    }}
                  >
                    <EditOutlined key="edit" />,
                  </Link>
                }
                style={{width: 300}}
              >
                <DeleteOutlined
                  key="delete"
                  onClick={() => handleDelete(currentCard.id)}
                />
                <p>Question:{currentCard.question} </p>
                <p>Answer:{currentCard.answer} </p>
              </Card>
            );
          })
        ) : (
          <h1>THERE ARE NO CARDS TO DISPLAY</h1>
        )}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    currentDeck: state.currentDeckState,
  };
}

export default connect(mapStateToProps, {getCards, deleteCard, getDeckId})(Cards);
