import React from "react";
import styles from "./Home.module.css";
import RecentDecks from "../RecentDecks/RecentDecks";
import Dashboard from "../../layout/Dashboard/Dashboard";
import DeckCard from "../deckData/deckCard";

const Home = () => {
  return (
    <>
      <Dashboard>
        <div className={styles.leftContent} data-testid="content-left">
          <DeckCard />
        </div>
        <div className={styles.rightContent} data-testid="content-right">
          <RecentDecks />
        </div>
      </Dashboard>
    </>
  );
};

export default Home;
