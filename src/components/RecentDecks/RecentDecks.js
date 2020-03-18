import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {Card, Avatar} from "antd";
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
                actions={[<Link to={`/decks/${deck.deck_id}`}>Play</Link>]}
                loading={loading}
                className={styles.deckCard}
                key={index}
              >
                <Meta
                  avatar={<Avatar src="logo192.png" />}
                  description="This is the description"
                  cardnumber="52"
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
