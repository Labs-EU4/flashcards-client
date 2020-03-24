import React, {useState} from "react";
import {Icon, Popover, Button} from "antd";
import styles from "./DeckList.module.css";
import {Link, useHistory} from "react-router-dom";

export default function DeckCard({deck, page}) {
  let history = useHistory();
  const [visible, setVisible] = useState(false);

  function hide() {
    setVisible(false);
  }

  function handleVisibleChange() {
    setVisible(!visible);
  }

  function openDeck(id) {
    history.push({
      pathname: `/deck/${id}`,
      state: {source: page},
    });
  }

  return (
    <div
      className={styles.deckCard}
      data-testid="deck_card_container"
      onClick={() => console.log("hi")}
    >
      <div className={styles.deckOverview}>
        <div className={styles.header}>
          <h2 data-testid="deck_name">{deck.deck_name}</h2>
          <div className={styles.info}>
            <h3 className={styles.info_headings} data-testid="author">
              Author: {deck.author ? deck.author : "You"}
            </h3>
            <h3 className={styles.info_headings} data-testid="flashcards_count">
              No. of Cards: {deck.flashcards.length}
            </h3>
          </div>
        </div>
        <div className={styles.actions}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={() => openDeck(deck.deck_id)}
          >
            Open Deck
          </Button>
          <Icon type="like" style={{color: "rgba(0,0,0,.25)"}} data-testid="like" />
          <Icon type="dislike" style={{color: "rgba(0,0,0,.25)"}} data-testid="dislike" />
          <Popover
            placement="bottom"
            content={
              <div data-testid="popover">
                <div className={styles.gameOptions}>
                  <h4>Play through</h4>
                  <Button>Input</Button>
                  <Button>Cards</Button>
                </div>
                <Link to={`/play/${deck.deck_id}`}>
                  <Button type="primary" onClick={hide}>
                    Start
                  </Button>
                </Link>
              </div>
            }
            title="Title"
            trigger="click"
            visible={visible}
            onVisibleChange={handleVisibleChange}
          >
            <Icon
              type="more"
              style={{color: "rgba(0,0,0,.25)"}}
              data-testid="more_options"
            />
          </Popover>

          <Icon type="star" style={{color: "rgba(0,0,0,.25)"}} />
        </div>
      </div>
    </div>
  );
}
