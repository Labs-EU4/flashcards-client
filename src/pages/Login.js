import React, {useState} from "react";
import {Form, Icon, Input, Button} from "antd";
import axios from "axios";
import "../pages/Login.css";
import {connect} from "react-redux";
import {login} from "../state/IsLoggedIn/IsLoggedInActionCreators";

const Login = props => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleChange = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log(props.login);

    props.login(setError, formValues);
  };
  const {getFieldDecorator} = props.form;
  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <Form.Item>
        {getFieldDecorator("email", {
          //rules are for the form validation
          rules: [
            {required: true, message: "Please input a email!"},
            {
              type: "email",
              message: "Invalid email",
            },
          ],
        })(
          <Input
            name="email"
            setFieldsValue={formValues.email}
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
            setFieldsValue={formValues.password}
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
      </Form.Item>
    </Form>
  );
};

export const WrappedNormalLoginForm = Form.create({name: "normal_login"})(Login);

export default connect(() => {}, {login})(WrappedNormalLoginForm);
