import React from "react";
import styles from "./Home.module.css";
import RecentDecks from "../RecentDecks/RecentDecks";

const Home = () => {
  return (
    <>
      <div className={styles.leftContent}></div>
      <div className={styles.rightContent}>
        <RecentDecks />
      </div>
    </>
  );
};

export default Home;
