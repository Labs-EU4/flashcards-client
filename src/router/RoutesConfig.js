import Home from "../pages/Home";
import PageNotFound from "../pages/404";
import Register from "../pages/Register/Register";

import Login from "../pages/Login";
import Dashboard from "../components/Dashboard/Dashboard";
import {Redirect} from "react-router-dom";
import React from "react";
//This function is connected directly to the store and checks if user is logged in or not.
import checkLoginState from "./checkLoginState";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ForgotPassword/ResetPassword";
/*
  Routes config must be ordered the same way you'd 
  do inside a `<Switch>`. The last route object is 
  a "fallback" route, to catch 404 errors.
*/

function createRenderCallback(Component) {
  //Creates a render callback for protected pages.
  return function(props) {
    return checkLoginState() ? <Component /> : <Redirect to="/login" />;
  };
}

const RoutesConfig = [
  {
    path: "/",
    //protected route takes path and a render prop
    render: createRenderCallback(Home),
    // component: Home,
  },

  {
    path: "/login",
    //Unprotected route takes path and a component prop
    component: Login,
  },
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/reset-password",
    component: ForgotPassword,
  },
  {
    path: "/reset/:id",
    component: ResetPassword,
  },
  {
    path: "*",
    component: PageNotFound,
  },
];

export default RoutesConfig;
