import React from "react";
import {Redirect} from "react-router-dom";

import GoogleLogin from "../pages/GoogleLogin/GoogleLogin";
import PageNotFound from "../pages/404";
import Login from "../pages/Login/Login";
import Dashboard from "../layout/Dashboard/Dashboard";
import Register from "../pages/Register/Register";

//This function is connected directly to the store and checks if user is logged in or not.
import Public from "../pages/PublicDecks/PublicDecks";
import Personal from "../pages/PersonalDecks/PersonalDecks";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ForgotPassword/ResetPassword";
import PlayMode from "../pages/PlayMode/PlayMode";
import ConfirmSignUp from "../pages/ConfirmSignUp/ConfirmSignUp";
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
    path: "/login/google/:token",
    component: GoogleLogin,
  },
  {
    path: "/login",
    //Unprotected route takes path and a component prop
    component: Login,
  },
  {
    path: "/play/:deckId",
    //Unprotected route takes path and a component prop
    component: PlayMode,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/deck-library",
    render: () => createPrivateRoute(Personal),
  },
  {
    path: "/discover-decks",
    render: () => createPrivateRoute(Public),
  },
  {
    path: "/",
    render: () => createPrivateRoute(Dashboard),
  },
  {
    path: "/confirm/:id",
    component: ConfirmSignUp,
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
