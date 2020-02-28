import React, {useState} from "react";
import {connect} from "react-redux";
import {registerNewUser} from "../../state/userData/userDataActionCreators";
// import {useHistory} from "react-router-dom";
import {Form, Input, Button, Icon} from "antd";
import styles from "./Register.module.css";

export function RegisterForm({registerNewUser, ...props}) {
  //controls feedback messages for user
  const [emailInfo, setEmailInfo] = useState({
    emailValidationStatus: null,
    help: null,
  });
  const [usernameInfo, setUsernameInfo] = useState({
    usernameValidationStatus: null,
    help: null,
  });
  const [passwordInfo, setPasswordInfo] = useState({
    passwordValidationStatus: null,
    help: null,
  });

  //default inputs for form
  const defaultInputs = {
    email: "",
    fullName: "",
    password: "",
  };
  const [user, setUser] = useState(defaultInputs);

  //control additional feedback for user
  const [registerDisabled, setRegisterDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const {email, fullName, password} = e.target;
    try {
      if (email.value && fullName.value && password.value) {
        setIsLoading(true);
        setRegisterDisabled(true);
        await registerNewUser(user);
        console.log(user);
        setIsLoading(false);
        setUser(defaultInputs);
        console.log(user);
        setRegisterDisabled(false);
      } else {
        if (!email.value) {
          setEmailInfo({emailValidationStatus: "error", help: "Please enter an Email."});
          setRegisterDisabled(true);
        }
        if (!fullName.value) {
          setUsernameInfo({
            usernameValidationStatus: "error",
            help: "Please enter a Username.",
          });
          setRegisterDisabled(true);
        }
        if (!password.value) {
          setPasswordInfo({
            passwordValidationStatus: "error",
            help: "Please enter a Password.",
          });
          setRegisterDisabled(true);
        }
      }
    } catch (err) {
      setIsLoading(false);
      setRegisterDisabled(false);
      if (err.response.data.message === "User with this email already exists") {
        setRegisterDisabled(true);
        setEmailInfo({emailValidationStatus: "error", help: err.response.data.message});
      } else {
        console.error(err.response.data.message);
      }
    }
  }

  function emailValidation(e) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let inputString = e.target.value;

    const email = inputString.match(emailRegex);

    if (email) {
      setEmailInfo({emailValidationStatus: "success", help: null});
      setRegisterDisabled(false);
    } else {
      setEmailInfo({emailValidationStatus: "warning", help: "Not a valid email"});
      setRegisterDisabled(true);
    }
  }

  function usernameValidation(e) {
    let inputString = e.target.value;

    if (inputString.length >= 5) {
      setUsernameInfo({usernameValidationStatus: "success", help: null});
      setRegisterDisabled(false);
    } else {
      setUsernameInfo({
        usernameValidationStatus: "warning",
        help: "Username must be at least 5 characters",
      });
      setRegisterDisabled(true);
    }
  }

  function passwordValidation(e) {
    let inputString = e.target.value;

    if (inputString.length >= 5) {
      setPasswordInfo({passwordValidationStatus: "success", help: null});
      setRegisterDisabled(false);
    } else {
      setPasswordInfo({
        passwordValidationStatus: "warning",
        help: "Password must be at least 5 characters",
      });
      setRegisterDisabled(true);
    }
  }

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.registerContainer} data-testid="test_register_container">
      <h1>Sign-up.</h1>
      <Form
        onSubmit={event => handleSubmit(event)}
        className={styles.registerForm}
        data-testid="test_register_form"
      >
        <Form.Item
          data-testid="test_email_form_item"
          hasFeedback
          validateStatus={emailInfo.emailValidationStatus}
          help={emailInfo.help}
        >
          <Input
            data-testid="test_email_input"
            onBlur={e => emailValidation(e)}
            prefix={<Icon type="mail" style={{color: "rgba(0,0,0,.25)"}} />}
            placeholder="email"
            type="text"
            name="email"
            value={user.email}
            onChange={event => handleChange(event)}
          />
        </Form.Item>
        <Form.Item
          data-testid="test_username_form_item"
          hasFeedback
          validateStatus={usernameInfo.usernameValidationStatus}
          help={usernameInfo.help}
        >
          <Input
            data-testid="test_username_input"
            onBlur={e => usernameValidation(e)}
            prefix={<Icon type="user" style={{color: "rgba(0,0,0,.25)"}} />}
            placeholder="username"
            type="text"
            name="fullName"
            value={user.fullName}
            onChange={event => handleChange(event)}
          />
        </Form.Item>
        <Form.Item
          data-testid="test_password_form_item"
          hasFeedback
          validateStatus={passwordInfo.passwordValidationStatus}
          help={passwordInfo.help}
        >
          <Input
            data-testid="test_password_input"
            onBlur={e => passwordValidation(e)}
            prefix={<Icon type="lock" style={{color: "rgba(0,0,0,.25)"}} />}
            placeholder="password"
            type="password"
            name="password"
            value={user.password}
            onChange={event => handleChange(event)}
          />
        </Form.Item>
        <Form.Item data-testid="test_submit_form_item">
          <Button
            data-testid="test_submit_button"
            type="primary"
            htmlType="submit"
            className={styles.registerFormButton}
            disabled={registerDisabled}
            loading={isLoading}
          >
            Register
          </Button>
          Or <a href="/login">Login Here!</a>
        </Form.Item>
      </Form>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userData: state.userData,
  };
}

const ConnectedForm = connect(mapStateToProps, {registerNewUser})(RegisterForm);

export default Form.create()(ConnectedForm);
