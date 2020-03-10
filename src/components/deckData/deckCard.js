import React, {useState, useEffect} from "react";
import {Card, Avatar} from "antd";
import {getAllDecks} from "../../state/actions/decks/decksActions";
import {EditOutlined, DeleteOutlined, PlayCircleOutlined} from "@ant-design/icons";
import styles from "./deckCard.module.css";

const {Meta} = Card;

const DeckCard = () => {
  const [decks, setDecks] = useState([{}, {}, {}]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("hi");

    getAllDecks()();
  }, []);
  return (
    <div className={styles.DeckCardContainer}>
      <h1 className={styles.MyDecks}>My Decks</h1>
      {decks.map(deck => {
        return (
          <Card
            style={{width: 300}}
            actions={[
              <PlayCircleOutlined key="play" />,
              <EditOutlined key="edit" />,
              <DeleteOutlined key="delete" />,
            ]}
            loading={loading}
            className={styles.deckCard}
          >
            <Meta
              avatar={<Avatar src="logo192.png" />}
              description="This is the description"
            />
          </Card>
        );
      })}
    </div>
  );
};

export default DeckCard;
