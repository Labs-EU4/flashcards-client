import React, { useState } from "react";
import {connect} from 'react-redux';
import {registerNewUser} from '../state/userData/userDataActionCreators' 

export function RegisterForm({registerNewUser, userData}) {
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
  const handleSubmit = e => {
    e.preventDefault();
    console.log(user);
    registerNewUser(user)
    setUser(defaultInputs);
    // registerUser(user);
    // history.pushState("/");
  };
  return (
    <div className="register">
      {console.log(userData)}
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
            name="fullName"
            value={user.fullName}
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
        <input type="submit" />
      </form>
    </div>
  );
}

function mapStateToProps(state){
    return {
        userData: state.userData
    }
}

export default connect(mapStateToProps, {registerNewUser})(RegisterForm)