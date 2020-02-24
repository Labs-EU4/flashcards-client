import React, { useState } from "react";

export function RegisterForm() {
const defaultInputs = {
    email: "",
    username: "",
    password: ""
  }
  const [user, setUser] = useState(defaultInputs);
  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log(user);
    setUser(defaultInputs)
    // registerUser(user);
    // history.pushState("/");
  };
  return (
    <div className="register">
      <form onSubmit={event => handleSubmit(event)}>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={event => handleChange(event)}
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={event => handleChange(event)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={event => handleChange(event)}
          />
        </label>
        <button>Submit!</button>
      </form>
    </div>
  );
};