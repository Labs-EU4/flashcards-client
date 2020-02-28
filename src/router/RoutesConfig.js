import Home from "../pages/Home";
import PageNotFound from "../pages/404";
import Login from "../pages/Login";
import Dashboard from "../components/dashboard";
import {Redirect} from "react-router-dom";
import React from "react";
//This function is connected directly to the store and checks if user is logged in or not.
import checkLoginState from "./checkLoginState";
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
  },

  {
    path: "/login",
    //Unprotected route takes path and a component prop
    component: Login,
  },
  {
    path: "/dashboard",
    render: createRenderCallback(Dashboard),
  },

  {
    path: "*",
    component: PageNotFound,
  },
];

export default RoutesConfig;
