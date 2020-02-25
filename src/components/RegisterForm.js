import React, { useState } from "react";
import { connect } from "react-redux";
import { registerNewUser } from "../state/userData/userDataActionCreators";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Icon } from "antd";
import "antd/dist/antd.css";

export function RegisterForm({ registerNewUser, ...props }) {
  let history = useHistory();

  if (localStorage.getItem("token")) {
    history.push("/");
  }

  const defaultInputs = {
    email: "",
    fullName: "",
    password: ""
  };
  const [user, setUser] = useState(defaultInputs);

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
    console.log(user);
    registerNewUser(user);

    setUser(defaultInputs);
    history.push("/");
  }

  const { getFieldDecorator } = props.form;
  return (
    <div className="register">
      <Form onSubmit={event => handleSubmit(event)} className="login-form">
        <Form.Item label="Email">
          {getFieldDecorator("Email", {
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
        <Form.Item>
          <Button type="primary" htmlType="submit">
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
    userData: state.userData
  };
}

const ConnectedForm = connect(mapStateToProps, { registerNewUser })(
  RegisterForm
);

export default Form.create()(ConnectedForm);
