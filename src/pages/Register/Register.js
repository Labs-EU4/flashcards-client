import React, {useState} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Form, Input, Button, Icon, Alert} from "antd";
import {registerNewUser} from "../../state/actions/auth";
import {baseURL} from "../../utils/axios";
import styles from "./Register.module.css";
import GoogleButton from "../../components/GoogleLogin/GoogleButton";
import backgroundStyles from "../../components/formStyleComponent/FormStyleComponent.module.css";
import FormHeader from "../../components/formStyleComponent/FormHeader";

export function RegisterForm({registerNewUser, ...props}) {
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({message: null, type: null});
  const [formInfo, setFormInfo] = useState({
    email: {validationStatus: null, help: null},
    username: {validationStatus: null, help: null},
    password: {validationStatus: null, help: null},
    confirmPassword: {validationStatus: null, help: null},
  });
  const [user, setUser] = useState({
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const {email, fullName, password, confirmPassword} = user;
    try {
      if (email && fullName && password && confirmPassword) {
        setIsLoading(true);
        delete user.confirmPassword;
        await registerNewUser(user);
        await setAlert({
          message:
            "Account successflly created. Please check your email to verify your account.",
          type: "success",
        });
        setUser({email: "", fullName: "", password: "", confirmPassword: ""});
        setFormInfo({
          email: {validationStatus: null, help: null},
          username: {validationStatus: null, help: null},
          password: {validationStatus: null, help: null},
          confirmPassword: {validationStatus: null, help: null},
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
        if (!confirmPassword) {
          setFormInfo({
            ...formInfo,
            confirmPassword: {
              validationStatus: "error",
              help: "Please confirm your Password",
            },
          });
        }
      }
    } catch (error) {
      if (error.response.data.error) {
        setAlert({message: error.response.data.error, type: "error"});
      } else if (error.response.data.message) {
        setAlert({message: error.response.data.message, type: "error"});
      } else {
        setAlert({message: "Something went wrong!", type: "error"});
      }
      setUser({...user, confirmPassword: user.password});
    } finally {
      setIsLoading(false);
    }
  };
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
      if (inputString.length >= 5 && inputString === user.confirmPassword) {
        setFormInfo({
          ...formInfo,
          password: {validationStatus: "success", help: null},
          confirmPassword: {validationStatus: "success", help: null},
        });
      } else if (inputString.length < 5) {
        setFormInfo({
          ...formInfo,
          password: {
            validationStatus: "warning",
            help: "Password must be at least 5 characters",
          },
        });
      } else if (inputString !== user.confirmPassword) {
        setFormInfo({
          ...formInfo,
          confirmPassword: {
            validationStatus: "warning",
            help: "Passwords do not match",
          },
          password: {
            validationStatus: "success",
            help: null,
          },
        });
      }
    } else if (inputType === "confirmPassword") {
      if (inputString === user.password) {
        setFormInfo({
          ...formInfo,
          confirmPassword: {validationStatus: "success", help: null},
          password: {validationStatus: "success", help: null},
        });
      } else {
        setFormInfo({
          ...formInfo,
          confirmPassword: {
            validationStatus: "warning",
            help: "Passwords do not match",
          },
        });
      }
    }
  }
  return (
    <div className={backgroundStyles.formStyle} data-testid="test_register_container">
      <FormHeader />
      <h1>Sign-up.</h1>
      <Form
        onSubmit={handleSubmit}
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
            prefix={<Icon type="mail" style={{color: "rgba(0,0,0,.25)"}} />}
            placeholder="email"
            type="text"
            name="email"
            value={user.email}
            onChange={event => {
              handleChange(event);
              formValidation(event);
            }}
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
            prefix={<Icon type="user" style={{color: "rgba(0,0,0,.25)"}} />}
            placeholder="username"
            type="text"
            name="fullName"
            value={user.fullName}
            onChange={event => {
              handleChange(event);
              formValidation(event);
            }}
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
            prefix={<Icon type="lock" style={{color: "rgba(0,0,0,.25)"}} />}
            placeholder="password"
            type="password"
            name="password"
            value={user.password}
            onChange={event => {
              handleChange(event);
              formValidation(event);
            }}
          />
        </Form.Item>
        <Form.Item
          data-testid="test_confirmPassword_form_item"
          hasFeedback
          validateStatus={formInfo.confirmPassword.validationStatus}
          help={formInfo.confirmPassword.help}
        >
          <Input
            data-testid="test_confirmPassword_input"
            prefix={<Icon type="lock" style={{color: "rgba(0,0,0,.25)"}} />}
            placeholder="confirm password"
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={event => {
              handleChange(event);
              formValidation(event);
            }}
          />
        </Form.Item>
        <Form.Item data-testid="test_submit_form_item">
          <Button
            data-testid="test_submit_button"
            type="primary"
            htmlType="submit"
            className={styles.registerFormButton}
            disabled={
              formInfo.email.validationStatus !== "success" ||
              formInfo.username.validationStatus !== "success" ||
              formInfo.password.validationStatus !== "success" ||
              formInfo.confirmPassword.validationStatus !== "success"
                ? true
                : false
            }
            loading={isLoading}
          >
            Register
          </Button>
          Or <Link to="/login">Login Here!</Link>
          <GoogleButton>SIGN UP WITH GOOGLE</GoogleButton>
        </Form.Item>
        {alert.message && (
          <Alert
            data-testid="test_alert"
            message={alert.message}
            type={alert.type}
            closable
            afterClose={() => setAlert({message: null, type: null})}
          />
        )}
      </Form>
    </div>
  );
}
const ConnectedForm = connect(null, {registerNewUser})(RegisterForm);
export default Form.create()(ConnectedForm);
