import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { registerNewUser } from "../state/userData/userDataActionCreators";
import { useHistory } from "react-router-dom";
import { Form, Select, Input, Button, Icon } from "antd";
import "antd/dist/antd.css";

export function RegisterForm({ registerNewUser, ...props }) {
  let history = useHistory();
  const defaultInputs = {
    email: "",
    fullName: "",
    password: ""
  };
  const [user, setUser] = useState(defaultInputs);

  // useEffect(() => {
  //   checkToken();
  // }, []);

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log(user);
    registerNewUser(user);

    setUser(defaultInputs);
    history.push("/");
  }

  // function checkToken() {
  //   localStorage.getItem("token") ? null : history.push("/");
  // }
  const { getFieldDecorator } = props.form;
  return (
    <div className="register">
      <Form onSubmit={event => handleSubmit(event)} className="login-form">
        <Form.Item label="Email">
          {getFieldDecorator("email", {
            rules: [{ required: true, message: "Please input your email!" }]
          })(
            <Input
              type="text"
              name="email"
              setfieldvalue={user.email}
              onChange={event => handleChange(event)}
            />
          )}
        </Form.Item>
        <Form.Item label="Username">
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              type="text"
              name="fullName"
              setfieldvalue={user.fullName}
              onChange={event => handleChange(event)}
            />
          )}
        </Form.Item>
        <Form.Item label="Password">
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="password"
              type="password"
              name="password"
              setfieldvalue={user.password}
              onChange={event => handleChange(event)}
            />
          )}
        </Form.Item>
        {/* <label>
          Email:
          <Input
            type="text"
            name="email"
            value={user.email}
            onChange={event => handleChange(event)}
          />
        </label>
        <label>
          Username:
          <Input
            type="text"
            name="fullName"
            value={user.fullName}
            onChange={event => handleChange(event)}
          />
        </label>
        <label>
          Password:
          <Input
            type="password"
            name="password"
            value={user.password}
            onChange={event => handleChange(event)}
          />
        </label> */}
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userData: state.userData
  };
}

const ConnectedForm = connect(mapStateToProps, { registerNewUser })(
  RegisterForm
);

export default Form.create()(ConnectedForm);
