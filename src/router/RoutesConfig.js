import Home from "../pages/Home";
import PageNotFound from "../pages/404";
import Login from "../pages/Login";
import Dashboard from "../components/dashboard";
import checkLoginState from "./checkLoginState";
import {Redirect} from "react-router-dom";
import React from "react";

/*
  Routes config must be ordered the same way you'd 
  do inside a `<Switch>`. The last route object is 
  a "fallback" route, to catch 404 errors.
*/

const RoutesConfig = [
  {
    path: "/",
    render: props => (checkLoginState() ? <Home /> : <Redirect to="/login" />),
  },

  {
    path: "/login",
    component: Login,
  },
  {
    path: "/dashboard",
    render: props => (checkLoginState() ? <Dashboard /> : <Redirect to="/login" />),
  },

  {
    path: "*",
    component: PageNotFound,
  },
];

export default RoutesConfig;
