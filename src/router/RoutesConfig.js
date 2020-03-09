import React from "react";
import {Redirect} from "react-router-dom";

import PageNotFound from "../pages/404";
import Login from "../pages/Login/Login";
import Dashboard from "../components/dashboard";
import Register from "../pages/Register/Register";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ForgotPassword/ResetPassword";
import AddCard from "../components/CreateCard/AddCard";
import Cards from "../components/CreateCard/Cards";
import UpdateCard from "../components/CreateCard/UpdateCard";

/*
  Routes config must be ordered the same way you'd 
  do inside a `<Switch>`. The last route object is 
  a "fallback" route, to catch 404 errors.
*/

function createPrivateRoute(Component) {
  //Creates a render callback for protected pages.
  return localStorage.getItem("token") ? <Component /> : <Redirect to="/login" />;
}

const RoutesConfig = [
  {
    path: "/",
    render: () => createPrivateRoute(Dashboard),
  },
  {
    path: "/login",
    //Unprotected route takes path and a component prop
    component: Login,
  },
  {
    path: "/cards",
    component: Cards,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/reset-password",
    component: ForgotPassword,
  },
  {path: "/updatecard", component: UpdateCard},
  {
    path: "/reset/:id",
    component: ResetPassword,
  },
  {
    path: "/addcard",
    component: AddCard,
  },
  {
    path: "*",
    component: PageNotFound,
  },
];

export default RoutesConfig;
