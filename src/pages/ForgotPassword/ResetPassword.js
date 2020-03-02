import React from "react";
import FormComponentChange from "../../components/ForgotPassword/FormComponentChangePassword";
import styles from "./ForgotPassword.module.css";

const ResetPassword = props => {
  return (
    <div className={styles.forgotPassword}>
      <FormComponentChange />
    </div>
  );
};

export default ResetPassword;
