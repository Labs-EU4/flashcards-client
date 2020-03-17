import React from "react";
import styles from "./Home.module.css";
import RecentDecks from "../RecentDecks/RecentDecks";
import Dashboard from "../../layout/Dashboard/Dashboard";

const Home = () => {
  return (
    <>
      <Dashboard>
        <div className={styles.leftContent}></div>
        <div className={styles.rightContent}>
          <RecentDecks />
        </div>
      </Dashboard>
    </>
  );
};

export default Home;