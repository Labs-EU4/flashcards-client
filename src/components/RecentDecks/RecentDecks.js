import React, {useState} from "react";
import {axiosWithAuth} from "../../utils/axios";
import styles from "./RecentDecks.module.css";

const RecentDecks = props => {
  const [recentDecks, setRecentDecks] = useState([]);

  axiosWithAuth()
    .get("https://flashdecks-staging.herokuapp.com/api/decks/access/")
    .then(res => {
      setRecentDecks(res.data.data);
    })
    .catch(err => {
      console.log(err);
    });

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Recently played</h1>
      <div>
        {recentDecks.length === 0 ? (
          <div className={styles.noDecks}>You haven't completed a session yet!</div>
        ) : (
          recentDecks.map((deck, index) => {
            return <div>LOL</div>;
          })
        )}
      </div>
    </div>
  );
};

export default RecentDecks;
