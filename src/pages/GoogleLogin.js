import React from "react";
import {Login} from "./Login";
import decode from "jwt-decode";
import {isAccountCreationFinished, setToken} from "../utils/auth";
import SetRecoveryPasswordForm from "../components/SetRecoveryPassword";
import styles from "./GoogleLogin.module.less";

export default function GoogleLogin(props) {
  const {match, history} = props;
  // const decodedToken = decode(match.params.token);
  if (isAccountCreationFinished(match.params.token)) {
    setToken(match.params.token);
  } else {
    return (
      <div className={styles.registerContainer}>
        <SetRecoveryPasswordForm />
      </div>
    );
  }
}
