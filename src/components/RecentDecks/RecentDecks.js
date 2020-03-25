import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import {Card, Avatar, Icon, Spin} from "antd";
import {getRecentDecks} from "../../state/actions/decks";
import styles from "./RecentDecks.module.css";
import {connect} from "react-redux";

const {Meta} = Card;

export const RecentDecks = ({recentDecks, getRecentDecks}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    getRecentDecks()
      .finally(() => {
        setLoading(false);
      })
      .catch(error => setError(error));
  }, [getRecentDecks]);
  const location = id => ({
    pathname: `/deck/${id}`,
    state: {source: "personal"},
  });
  return (
    <div className={styles.container}>
      <Spin spinning={loading}>
        <h1 className={styles.heading} data-testid="heading">
          Recent decks
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
                    <Link to={`/play/${deck.deck_id}`}>
                      <Icon type="play-circle" theme="outlined" />
                    </Link>,
                  ]}
                  loading={loading}
                  className={styles.deckCard}
                  key={deck.deck_id}
                >
                  <Link to={location(deck.deck_id)}>
                    <Meta
                      avatar={<Avatar src="logo192.png" />}
                      description={deck.deck_name}
                    />
                  </Link>
                </Card>
              );
            })
          )}
        </div>
      </Spin>
    </div>
  );
};

const mapStateToProps = state => ({
  recentDecks: state.deckState.recentDecks,
});

const connected = connect(mapStateToProps, {getRecentDecks})(RecentDecks);
export default connected;
