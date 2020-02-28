import React from "react";
import NormalLoginForm from "../../components/ForgotPassword/FormComponent";
import styles from "./ForgotPassword.module.css";

const ForgotPassword = props => {
  return (
    <div className={styles.forgotPassword}>
      <NormalLoginForm />
    </div>
  );
};

export default ForgotPassword;
