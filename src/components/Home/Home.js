import React from "react";
import styles from "./Home.module.css";
import RecentDecks from "../RecentDecks/RecentDecks";
import Dashboard from "../../layout/Dashboard/Dashboard";
import DeckContainer from "../DeckBoard/DeckContainer";
import NewDeckForm from "../NewDeckForm/NewDeckForm";

const Home = ({history}) => {
  return (
    <>
      <Dashboard>
        <div className={styles.leftContent} data-testid="content-left">
          <DeckContainer history={history} />
        </div>
        <div className={styles.rightContent} data-testid="content-right">
          <RecentDecks history={history} />
          <NewDeckForm />
        </div>
      </Dashboard>
    </>
  );
};

export default Home;
