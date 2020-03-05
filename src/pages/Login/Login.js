import React, {useState} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Form, Icon, Input, Button, Spin, Alert} from "antd";

import {login} from "../../state/actions/auth";
import "./Login.css";

export const Login = props => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
      setError(error);
    } finally {
      setLoading(false);
      props.form.resetFields();
    }
  };
  const {getFieldDecorator} = props.form;
  return (
    <div className="login-container">
      <Spin spinning={loading} delay={300}>
        <h1>Login</h1>
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Item>
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
                name="email"
                setfieldsvalue={formValues.email}
                onChange={handleChange}
                //form icon in the email field, change type for different icons, see antdesign docs
                prefix={<Icon type="mail" style={{color: "rgba(0,0,0,.25)"}} />}
                placeholder="Email"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              //rules are for the form validation
              rules: [
                {required: true, message: "Please input a password!"},
                {
                  type: "string",
                  message: "Invalid password",
                },
              ],
            })(
              <Input
                name="password"
                type="password"
                setfieldsvalue={formValues.password}
                onChange={handleChange}
                //form icon in the email field, change type for different icons, see antdesign docs
                prefix={<Icon type="lock" style={{color: "rgba(0,0,0,.25)"}} />}
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Login
            </Button>
            Forgot password? <Link to="/reset-password">click here to reset! </Link>
            Or <Link to="/register">register here!</Link>
          </Form.Item>
          {error && (
            <Alert
              message={error}
              type="error"
              closable
              afterClose={() => setError(null)}
            />
          )}
        </Form>
      </Spin>
    </div>
  );
};

export const WrappedNormalLoginForm = Form.create({name: "normal_login"})(Login);

export default connect(null, {login})(WrappedNormalLoginForm);
