import React, {useState} from "react";
import {Icon, Popover, Button} from "antd";
import styles from "./DeckList.module.css";

export default function DeckCard({deck}) {
  const [visible, setVisible] = useState(false);

  function hide() {
    setVisible(false);
  }

  function handleVisibleChange() {
    setVisible(!visible);
  }

  return (
    <div className={styles.deckCard}>
      <div className={styles.deckOverview}>
        <div className={styles.header}>
          <h2>{deck.deck_name}</h2>
          <div className={styles.info}>
            <h3 className={styles.info_headings}>Author: {deck.author}</h3>
            <h3 className={styles.info_headings}>
              No. of Cards: {deck.flashcards.length}
            </h3>
          </div>
        </div>
        <div className={styles.actions}>
          <Icon type="like" style={{color: "rgba(0,0,0,.25)"}} />
          <Icon type="dislike" style={{color: "rgba(0,0,0,.25)"}} />
          <Popover
            placement="bottom"
            content={
              <>
                <div className={styles.gameOptions}>
                  <h4>Play through</h4>
                  <Button>Input</Button>
                  <Button>Cards</Button>
                </div>
                <Button type="primary" onClick={hide}>
                  Start
                </Button>
              </>
            }
            title="Title"
            trigger="click"
            visible={visible}
            onVisibleChange={handleVisibleChange}
          >
            <Icon type="more" style={{color: "rgba(0,0,0,.25)"}} />
          </Popover>

          <Icon type="star" style={{color: "rgba(0,0,0,.25)"}} />
        </div>
      </div>
      {/* <div className={styles.horizontalList}>
        {deck.flashcards.map(card => {
          return (
            <Card title="Question" className={styles.card}>
              {card.question}
            </Card>
          );
        })}
      </div> */}
    </div>
  );
}
