import React from "react";
import BasicLayout from "../layout/BasicLayout";
//less module import, individual classes can be destructured from this import
import styles from "./Home.module.less";

const Home = () => {
  return (
    <BasicLayout>
      <h1 className={styles.giant}>This is Home!</h1>
    </BasicLayout>
  );
};

export default Home;
