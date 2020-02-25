import React, {useState} from "react";
import {Form, Icon, Input, Button} from "antd";
import NormalLoginForm from "./component";
import "./index.css";

const ForgotPassword = props => {
  return (
    <div className="forgot-password">
      <h1>Reset Password</h1>
      {/* <Form>
        <label>Email</label>
        <Input
          type="text"
          name="email"
          value={formValues.email}
          onChange={handleChange}
        ></Input>
        <Button type="submit">Submit</Button>
      </Form> */}
      <NormalLoginForm />
    </div>
  );
};

export default ForgotPassword;
