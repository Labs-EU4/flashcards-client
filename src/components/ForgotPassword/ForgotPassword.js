import React from "react";

import NormalLoginForm from "./component";
import "./index.css";

const ForgotPassword = props => {
  return (
    <div className="forgot-password">
      <h1>Reset Password</h1>
      <NormalLoginForm />
    </div>
  );
};

export default ForgotPassword;
