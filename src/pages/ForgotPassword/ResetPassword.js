import React from "react";
import FormComponentChange from "../../components/ForgotPassword/FormComponentChangePassword";
import "./index.css";

const ResetPassword = props => {
  return (
    <div className="forgot-password">
      <h1>Reset Password</h1>
      <FormComponentChange />
    </div>
  );
};

export default ResetPassword;
