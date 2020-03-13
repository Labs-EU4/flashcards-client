import React, {useEffect, useState} from "react";
import styles from "../../components/formStyleComponent/FormStyleComponent.module.css";
import {useHistory} from "react-router-dom";
import {Spin, Alert, Button} from "antd";
import axios from "axios";
import {Link} from "react-router-dom";
import FormHeader from "../../components/formStyleComponent/FormHeader";

const ConfirmSignUp = props => {
  const history = useHistory();
  const tokenArray = history.location.pathname.split("/");
  const token = tokenArray[tokenArray.length - 1];
  const [state, setState] = useState({
    isLoading: true,
    tokenInvalid: null,
  });

  useEffect(() => {
    axios
      .post("https://flashdecks.herokuapp.com/api/auth/confirm_email", {
        token: token,
      })
      .then(res => {
        setState({...state, tokenInvalid: false, isLoading: false});
        localStorage.setItem("token", res.data.token);
        setTimeout(() => {
          history.push("/");
        }, 2000);
      })
      .catch(err => {
        setState({...state, tokenInvalid: true, isLoading: false});
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.formStyle}>
      <FormHeader />
      {state.isLoading === true ? (
        <Spin data-testid="loader" className="loader" size="large" />
      ) : null}
      {state.tokenInvalid === true ? (
        <div>
          <Alert
            message="Token invalid"
            description="The token you tried to use is not in our database."
            type="error"
            data-testid="alertInvalid"
          />
          <Link to="/register">
            <Button
              type="primary"
              htmlType="submit"
              data-testid="button"
              className={styles.returnSignUp}
              loading={state.isLoading}
            >
              Return to SignUp
            </Button>
          </Link>
        </div>
      ) : state.tokenInvalid === false ? (
        <Alert
          message="Success"
          description="Account activated, you will get redirected to dashboard!"
          type="success"
          data-testid="alertSuccess"
        />
      ) : null}
    </div>
  );
};

export default ConfirmSignUp;
