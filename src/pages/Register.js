import React, {useState} from "react";
import {connect} from "react-redux";
import {registerNewUser} from "../state/userData/userDataActionCreators";
import {useHistory} from "react-router-dom";
import {Form, Input, Button, Icon} from "antd";

export function RegisterForm({registerNewUser, ...props}) {
  let history = useHistory();
  const [emailInfo, setEmailInfo] = useState({emailValidationStatus: null, help: null});
  const [usernameInfo, setUsernameInfo] = useState({
    usernameValidationStatus: null,
    help: null,
  });
  const [passwordInfo, setPasswordInfo] = useState({
    passwordValidationStatus: null,
    help: null,
  });
  const [registerDisabled, setRegisterDisabled] = useState(false);

  if (localStorage.getItem("token")) {
    history.push("/");
  }

  const defaultInputs = {
    email: "",
    fullName: "",
    password: "",
  };
  const [user, setUser] = useState(defaultInputs);

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    const {email, fullName, password} = e.target;
    if (email.value && fullName.value && password.value) {
      setRegisterDisabled(true);
      setEmailInfo({...emailInfo, emailValidationStatus: "validating"});
      setEmailInfo({...usernameInfo, usernameValidationStatus: "validating"});
      setEmailInfo({...passwordInfo, passwordValidationStatus: "validating"});
      registerNewUser(user);
      setUser(defaultInputs);
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

  return (
    <div className="register-container">
      <Form onSubmit={event => handleSubmit(event)} className="register-form">
        <Form.Item
          hasFeedback
          validateStatus={emailInfo.emailValidationStatus}
          help={emailInfo.help}
        >
          <Input
            onBlur={e => emailValidation(e)}
            prefix={<Icon type="mail" style={{color: "rgba(0,0,0,.25)"}} />}
            placeholder="email"
            type="text"
            name="email"
            setfieldvalue={user.email}
            onChange={event => handleChange(event)}
          />
        </Form.Item>
        <Form.Item
          hasFeedback
          validateStatus={usernameInfo.usernameValidationStatus}
          help={usernameInfo.help}
        >
          <Input
            onBlur={e => usernameValidation(e)}
            prefix={<Icon type="user" style={{color: "rgba(0,0,0,.25)"}} />}
            placeholder="username"
            type="text"
            name="fullName"
            setfieldvalue={user.fullName}
            onChange={event => handleChange(event)}
          />
        </Form.Item>
        <Form.Item
          hasFeedback
          validateStatus={passwordInfo.passwordValidationStatus}
          help={passwordInfo.help}
        >
          <Input
            onBlur={e => passwordValidation(e)}
            prefix={<Icon type="lock" style={{color: "rgba(0,0,0,.25)"}} />}
            placeholder="password"
            type="password"
            name="password"
            setfieldvalue={user.password}
            onChange={event => handleChange(event)}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="register-form-button"
            disabled={registerDisabled}
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