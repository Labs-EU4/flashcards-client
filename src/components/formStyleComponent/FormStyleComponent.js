import React from "react";
import styles from "./FormStyleComponent.module.css";
import FormComponent from "../ForgotPassword/FormComponent";
import {Link} from "react-router-dom";

const FormStyleComponent = props => {
  return (
    <div className={styles.formStyle}>
      <div className={styles.header}>
        <Link to="/">
          <img src="https://i.imgur.com/UphXAvj.png" alt="logo" width="60px" />
        </Link>
      </div>
      <div>
        {/* PUT YOUR FORM COMPONENT HERE */}
        <FormComponent />
      </div>
    </div>
  );
};
export default FormStyleComponent;
