import React from "react";
import * as styles from "./GoogleButton.module.css";
import {baseURL} from "../../utils/axios";

export default function GoogleButton({children}) {
  return (
    <a className={styles.google_auth} href={`${baseURL}/auth/google`}>
      <img
        className={styles.google_icon}
        alt="google-icon"
        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
      />
      {children}
    </a>
  );
}
