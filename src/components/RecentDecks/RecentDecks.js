import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {Card, Avatar, Icon} from "antd";
import {axiosWithAuth} from "../../utils/axios";
import styles from "./RecentDecks.module.css";

const {Meta} = Card;

const RecentDecks = props => {
  const [recentDecks, setRecentDecks] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axiosWithAuth()
      .get("/decks/access/")
      .then(res => {
        setRecentDecks(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading} data-testid="heading">
        Recently played
      </h1>
      <div data-testid="decks">
        {recentDecks.length === 0 ? (
          <div className={styles.noDecks}>You haven't completed a session yet!</div>
        ) : (
          recentDecks.map((deck, index) => {
            return (
              <Card
                style={{width: 300}}
                actions={[
                  <Link to={`/decks/${deck.deck_id}`}>
                    <Icon type="play-circle" key="play" theme="outlined" />
                  </Link>,
                  <Icon
                    type="edit"
                    theme="outlined"
                    onClick={async e => {
                      try {
                        await props.getDeckById(deck.deck_id);
                        // showModal();
                      } finally {
                      }
                    }}
                    key="edit"
                  />,
                  <Icon
                    type="delete"
                    theme="outlined"
                    onClick={e => props.deleteDeck(deck.deck_id)}
                    key="delete"
                  />,
                ]}
                loading={loading}
                className={styles.deckCard}
              >
                <Meta
                  avatar={<Avatar src="logo192.png" />}
                  description={deck.deck_name}
                  cardNumber="52"
                />
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RecentDecks;
