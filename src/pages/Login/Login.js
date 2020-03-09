import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Form, Icon, Input, Button, Spin, Alert} from "antd";
import {baseURL} from "../../utils/axios";

import {login} from "../../state/actions/auth";
import "./Login.css";
import backgroundStyles from "../../components/formStyleComponent/FormStyleComponent.module.css";
import FormHeader from "../../components/formStyleComponent/FormHeader";

export const Login = props => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const hasErrors = fieldsError => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };
  const handleChange = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      await props.login(formValues);
      props.history.push("/");
    } catch (error) {
      console.log(JSON.stringify(error));

      setError(error);
    } finally {
      setLoading(false);
      props.form.resetFields();
    }
  };
  const {
    getFieldDecorator,
    getFieldsError,
    validateFields,
    isFieldTouched,
    getFieldError,
  } = props.form;
  useEffect(() => {
    validateFields();
  }, [validateFields]);
  const emailError = isFieldTouched("email") && getFieldError("email");
  const passwordError = isFieldTouched("password") && getFieldError("password");
  return (
    <div className={backgroundStyles.formStyle}>
      <FormHeader />
      <div>
        <h1>Login</h1>
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Item
            validateStatus={emailError ? "error" : ""}
            hasFeedback
            help={emailError || ""}
          >
            {getFieldDecorator("email", {
              //rules are for the form validation
              rules: [
                {required: true, message: "Please input a valid email!"},
                {
                  type: "email",
                  message: "Invalid email",
                },
              ],
            })(
              <Input
                data-testid="email-input"
                name="email"
                setFieldsValue={formValues.email}
                onInput={handleChange}
                //form icon in the email field, change type for different icons, see antdesign docs
                prefix={<Icon type="mail" style={{color: "rgba(0,0,0,.25)"}} />}
                placeholder="Email"
              />
            )}
          </Form.Item>
          <Form.Item
            validateStatus={passwordError ? "error" : ""}
            help={passwordError || ""}
            hasFeedback
          >
            {getFieldDecorator("password", {
              //rules are for the form validation
              rules: [{required: true, message: "Please input a password!"}],
            })(
              <Input
                name="password"
                type="password"
                data-testid="password-input"
                setFieldsValue={formValues.password}
                onInput={handleChange}
                //form icon in the email field, change type for different icons, see antdesign docs
                prefix={<Icon type="lock" style={{color: "rgba(0,0,0,.25)"}} />}
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              data-testid="login-button"
              htmlType="submit"
              className="login-form-button"
              disabled={hasErrors(getFieldsError())}
              loading={loading}
            >
              Login
            </Button>
            Forgot password? <Link to="/reset-password">click here to reset! </Link>
            Or <Link to="/register">register here!</Link>
            <a className="google-auth" href={`${baseURL}/auth/google`}>
              <img
                className="google-icon"
                alt="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              />
              SIGN IN WITH GOOGLE
            </a>
          </Form.Item>
          {error ? (
            <Alert
              message={error}
              type="error"
              data-testid="server-alert"
              closable
              afterClose={() => setError(null)}
            />
          ) : null}
        </Form>
      </div>
    </div>
  );
};

export const WrappedNormalLoginForm = Form.create({name: "normal_login"})(Login);

export default connect(null, {login})(WrappedNormalLoginForm);
