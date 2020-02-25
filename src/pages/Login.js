import React, { useState } from "react";
import axios from "axios";
import { withFormik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


function Login(props) {
  console.log(props);

  
  return (
    <div>
      <Form>
        <ErrorMessage name="email" render={msg => <div>{msg}</div>} />
        <label htmlFor="email_input">EMAIL</label>
        <Field
          type="email"
          placeholder="Enter a valid email"
          name="email"
          id="email_input"
        />

        <label htmlFor="password_input">PASSWORD</label>
        <ErrorMessage name="password" render={msg => <div>{msg}</div>} />
        <Field
          type="password"
          placeholder="Enter your password"
          name="password"
          id="password_input"
        />

        <input type="submit" />
      </Form>
      <span>Forgot password?</span>
    </div>
  );
}

const LoginFormWithFormik = withFormik({
  mapPropsToValues(...args) {
    return {
      email: "",
      password: ""
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().required("Please enter an email address"),
    password: Yup.string().required("Please enter a password")
  }),

  handleSubmit(values, tools) {
    // console.log(args);
    // These are the props we get when we submit our form
    // values: the values we get back from the form
    // tools: some helpful methods we can use to interact with the form
    console.log(values, tools);
    axios
      .post("http://localhost:4003/api/auth/login", values)
      .then(res => {
        console.log(res);
        tools.resetForm();
        localStorage.setItem("token", res.data.payload);
        // props.history.push("/dashboard");
      })
      .catch(err => {
        console.log(err);
      });
  }
})(Login);
export default LoginFormWithFormik;
