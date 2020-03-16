import React from "react";
import styles from "./Home.module.css";
import RecentDecks from "../RecentDecks/RecentDecks";
import Dashboard from "../../layout/Dashboard/Dashboard";
import CreateNewDeck from "../../components/NewDeckForm/NewDeckForm";

const Home = () => {
  return (
    <>
      <Dashboard>
        <div className={styles.leftContent}></div>
        <div className={styles.rightContent}>
          <RecentDecks />
          <CreateNewDeck />
        </div>
      </Dashboard>
    </>
  );
};

export default Home;
