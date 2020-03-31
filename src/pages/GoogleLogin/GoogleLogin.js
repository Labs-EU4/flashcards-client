import React from "react";
import {Spin} from "antd";
import {isAccountCreationFinished} from "../../utils/auth";
import SetRecoveryPasswordForm from "../../components/SetRecoveryPassword/SetRecoveryPassword";
import styles from "./GoogleLogin.module.less";
import {connect} from "react-redux";
import {addRecoveryPassword, googleAuthorized} from "../../state/actions/auth";

export function GoogleLogin(props) {
  const {match, history, addRecoveryPassword, googleAuthorized} = props;
  const {token} = match.params;
  if (isAccountCreationFinished(token)) {
    googleAuthorized(token, history);
    return <Spin spinning={true} data-testid="spinner" />;
  } else {
    return (
      <div className={styles.registerContainer}>
        <SetRecoveryPasswordForm
          token={token}
          addRecoveryPassword={addRecoveryPassword}
          history={history}
        />
      </div>
    );
  }
}

export default connect(null, {addRecoveryPassword, googleAuthorized})(GoogleLogin);
