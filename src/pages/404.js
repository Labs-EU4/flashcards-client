import React from "react";
import styles from "./four0four.module.css";
import {useHistory, Link} from "react-router-dom";
import {Button} from "antd";

const PageNotFound = () => {
  const history = useHistory();
  const path = history.location.pathname;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>404</h1>
      <h1 className={styles.resolve}>Couldn't resolve {path}</h1>
      <Link to="/">
        <Button>Back to Dashboard</Button>
      </Link>
    </div>
  );
};

export default PageNotFound;
