import React from "react";
import * as styles from "./GoogleButton.module.css";
import {baseURL} from "../../utils/axios";

export default function GoogleButton({children}) {
  return (
    <a className={styles.google_auth} href={`${baseURL}/auth/google`}>
      <div className={styles.gstyle}>
        <img
          className={styles.googleIcon}
          alt="google-icon"
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
        />
      </div>
      {children}
    </a>
  );
}
