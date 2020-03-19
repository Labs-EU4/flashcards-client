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
    //   Map the fetched cards to an ant design cards component for display on the browser

    <div className={styles.cardDeck}>
      <Dashboard className>
        <div className={styles.cardDeck}>
          <div className={styles.container}>
            <div className={styles.title}>
              <h2 className={styles.heading}>Deck name</h2>
              <Search
                placeholder="Search"
                onSearch={value => console.log(value)}
                style={{width: "240px"}}
                className={styles.search}
              />
              <div className={styles.sort}>
                <h2 className={styles.describe}>Sort By:</h2>
                <Select defaultValue="Home" style={{width: "150px", marginLeft: "10px"}}>
                  <Option value="Home">Option 1</Option>
                  <Option value="Company">Option2</Option>
                </Select>
              </div>

              <Button className={styles.btn} type="dashed" onClick={toggleMode}>
                Add a card
              </Button>
            </div>
            <Spin spinning={loading} delay={300}>
              <Modal
                title="Want a new card?"
                visible={show}
                footer={null}
                onCancel={handleAdd}
              >
                <AddCard toggleMode={toggleMode} />
              </Modal>
            </Spin>
            <div className={styles.mappedCard}>
              {props.currentDeck.flashcards &&
              props.currentDeck.flashcards.length !== 0 ? (
                props.currentDeck.flashcards.map(currentCard => {
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
        </div>
      </Dashboard>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    currentDeck: state.deckState.currentDeckState,
  };
}

export default connect(mapStateToProps, {getCards, deleteCard, getDeckId})(Cards);
