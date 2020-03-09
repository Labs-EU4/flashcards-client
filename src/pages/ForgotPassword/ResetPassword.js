import React from "react";
import FormComponentChange from "../../components/ForgotPassword/FormComponentChangePassword";
import styles from "../../components/formStyleComponent/FormStyleComponent.module.css";
import FormHeader from "../../components/formStyleComponent/FormHeader";

const ResetPassword = props => {
  return (
    <div className={styles.formStyle}>
      <FormHeader />
      <h1>Reset Password</h1>
      <FormComponentChange />
    </div>
  );
};

export default ResetPassword;
