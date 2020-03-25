import React, {useState} from "react";
import {Card, Avatar, Icon} from "antd";
import {Link} from "react-router-dom";
import * as styles from "./deckCard.module.css";
import EditModal from "./EditModal";
const {Meta} = Card;

export default function DeckCard({deck, deleteDeck, updateDeck}) {
  const [visible, setVisible] = useState(false);
  const location = id => ({
    pathname: `/deck/${id}`,
    state: {source: "personal"},
  });
  return (
    <>
      <Card
        style={{width: 300}}
        actions={[
          <Link to={`/play/${deck.deck_id}`}>
            <Icon type="play-circle" data-testid="play" />
          </Link>,
          <Icon type="edit" onClick={() => setVisible(!visible)} data-testid="edit" />,
          <Icon
            type="delete"
            onClick={e => deleteDeck(deck.deck_id)}
            data-testid="delete"
          />,
        ]}
        className={styles.deckCard}
      >
        <Link to={location(deck.deck_id)}>
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
