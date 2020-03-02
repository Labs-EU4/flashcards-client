import React, {useState} from "react";
import {connect} from "react-redux";
import {registerNewUser} from "../../state/userData/userDataActionCreators";
// import {useHistory} from "react-router-dom";
import {Form, Input, Button, Icon} from "antd";
import styles from "./Register.module.css";

export function RegisterForm({registerNewUser, ...props}) {
  const [formInfo, setFormInfo] = useState({
    email: {validationStatus: null, help: null},
    username: {validationStatus: null, help: null},
    password: {validationStatus: null, help: null},
  });

  //default inputs for form
  const defaultInputs = {
    email: "",
    fullName: "",
    password: "",
  };
  const [user, setUser] = useState(defaultInputs);

  //control additional feedback for user
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const {email, fullName, password} = user;
    try {
      if (email && fullName && password) {
        setIsLoading(true);
        await registerNewUser(user);
        console.log(user);
        setIsLoading(false);
        setUser(defaultInputs);
        console.log(user);
        setFormInfo({
          ...formInfo,
          email: {validationStatus: null, help: null},
          username: {validationStatus: null, help: null},
          password: {validationStatus: null, help: null},
        });
      } else {
        if (!email) {
          setFormInfo({
            ...formInfo,
            email: {validationStatus: "error", help: "Please enter an Email"},
          });
        }
        if (!fullName) {
          setFormInfo({
            ...formInfo,
            username: {validationStatus: "error", help: "Please enter a Username"},
          });
        }
        if (!password) {
          setFormInfo({
            ...formInfo,
            password: {validationStatus: "error", help: "Please enter a Password"},
          });
        }
      }
    } catch (err) {
      setIsLoading(false);
      if (err.response.data.message === "User with this email already exists") {
        setFormInfo({
          ...formInfo,
          email: {validationStatus: "error", help: err.response.data.message},
        });
      } else {
        console.error(err.response.data.message);
      }
    }
  }

  function formValidation(e) {
    let inputString = e.target.value;
    let inputType = e.target.name;
    if (inputType === "email") {
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const email = inputString.match(emailRegex);
      if (email) {
        setFormInfo({...formInfo, email: {validationStatus: "success", help: null}});
      } else {
        setFormInfo({
          ...formInfo,
          email: {validationStatus: "warning", help: "Not a valid email"},
        });
      }
    } else if (inputType === "fullName") {
      if (inputString.length >= 5) {
        setFormInfo({...formInfo, username: {validationStatus: "success", help: null}});
      } else {
        setFormInfo({
          ...formInfo,
          username: {
            validationStatus: "warning",
            help: "Username must be at least 5 characters",
          },
        });
      }
    } else if (inputType === "password") {
      if (inputString.length >= 5) {
        setFormInfo({...formInfo, password: {validationStatus: "success", help: null}});
      } else {
        setFormInfo({
          ...formInfo,
          password: {
            validationStatus: "warning",
            help: "Password must be at least 5 characters",
          },
        });
      }
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
          validateStatus={formInfo.email.validationStatus}
          help={formInfo.email.help}
        >
          <Input
            data-testid="test_email_input"
            onBlur={e => formValidation(e)}
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
          validateStatus={formInfo.username.validationStatus}
          help={formInfo.username.help}
        >
          <Input
            data-testid="test_username_input"
            onBlur={e => formValidation(e)}
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
          validateStatus={formInfo.password.validationStatus}
          help={formInfo.password.help}
        >
          <Input
            data-testid="test_password_input"
            onBlur={e => formValidation(e)}
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
            disabled={
              formInfo.email.validationStatus != "success" ||
              formInfo.username.validationStatus != "success" ||
              formInfo.password.validationStatus != "success"
                ? true
                : false
            }
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
