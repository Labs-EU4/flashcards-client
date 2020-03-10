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
      <h1>Test</h1>
      {recentDecks.map((deck, index) => {
        return <div>LOL</div>;
      })}
    </div>
  );
};

export default RecentDecks;
