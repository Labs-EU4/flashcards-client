import React from "react";
import {Link} from "react-router-dom";
import styles from "./FormStyleComponent.module.css";

const FormHeader = props => {
  return (
    <div className={styles.header}>
      <Link to="/">
        <img
          src="https://i.imgur.com/tuS7kwh.png"
          alt="logo"
          width="60px"
          data-testid="logo"
        />
      </Link>
    </div>
  );
};
export default FormHeader;
