import React, {useState} from "react";
import {Card, Avatar, Icon} from "antd";
import {Link} from "react-router-dom";
import * as styles from "./deckCard.module.css";
import EditModal from "./EditModal";
const {Meta} = Card;

export default function DeckCard({deck, deleteDeck, updateDeck}) {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Card
        style={{width: 300}}
        actions={[
          <Link to={`/play/${deck.deck_id}`}>
            <Icon type="play-circle" />
          </Link>,
          <Icon type="edit" onClick={() => setVisible(!visible)} />,
          <Icon type="delete" onClick={e => deleteDeck(deck.deck_id)} />,
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
