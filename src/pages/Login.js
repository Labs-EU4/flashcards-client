import React, { useState } from "react";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import * as EmailValidator from "email-validator";
function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // make a POST request to the server
    // the server will "authenticate" the user passed on their credentials
    // If they can be authenticated the server will return a token
    axios
      .post("http://localhost:4003/api/auth/login")
      .then(res => {
        console.log(res);
        localStorage.setItem("token", res.data.payload);
        props.history.push("/dashboard");
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email_input">EMAIL</label>
        <input
          type="text"
          placeholder="Enter a valid email"
          name="email"
          id="email_input"
          onChange={handleChange}
          value={email}
        />

        <label htmlFor="password_input">PASSWORD</label>
        <input
          type="password"
          placeholder="Enter your password"
          name="password"
          onChange={handleChange}
          id="password_input"
          value={password}
        />

        <input type="submit" />
      </form>
      <span>Forgot password?</span>
    </div>
  );
}

export default Login;
