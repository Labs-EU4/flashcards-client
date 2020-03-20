import React, {useState} from "react";
import {Card, Avatar} from "antd";
import {Link} from "react-router-dom";
import {EditOutlined, DeleteOutlined, PlayCircleOutlined} from "@ant-design/icons";
import * as styles from "./deckCard.module.css";
import EditModal from "./EditModal";
const {Meta} = Card;

export default function DeckCard({deck, deleteDeck, updateDeck}) {
  console.log("/n/n/n/", deck);
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Card
        style={{width: 300}}
        actions={[
          <Link to={`/play/${deck.deck_id}`}>
            <PlayCircleOutlined key="play" />
          </Link>,
          <EditOutlined onClick={() => setVisible(!visible)} key="edit" />,
          <DeleteOutlined onClick={e => deleteDeck(deck.deck_id)} key="delete" />,
        ]}
        className={styles.deckCard}
      >
        <Link>
          <Meta avatar={<Avatar src="logo192.png" />} description={deck.deck_name} />
        </Link>
      </Card>
      <EditModal
        visible={visible}
        deckValues={deck}
        updateDeck={updateDeck}
        setVisible={setVisible}
      />
    </>
  );
}
