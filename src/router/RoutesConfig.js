import React from "react";
import {Redirect} from "react-router-dom";

import GoogleLogin from "../pages/GoogleLogin/GoogleLogin";
import PageNotFound from "../pages/404";
import Login from "../pages/Login/Login";
import Home from "../components/Home/Home";
import Register from "../pages/Register/Register";

//This function is connected directly to the store and checks if user is logged in or not.
import Public from "../pages/PublicDecks/PublicDecks";
import Personal from "../pages/PersonalDecks/PersonalDecks";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ForgotPassword/ResetPassword";
import DeckView from "../pages/ViewDeckCards/DeckCards";

import PlayMode from "../pages/PlayMode/PlayMode";
import ConfirmSignUp from "../pages/ConfirmSignUp/ConfirmSignUp";
import decode from "jwt-decode";
/*
  Routes config must be ordered the same way you'd 
  do inside a `<Switch>`. The last route object is 
  a "fallback" route, to catch 404 errors.
*/

function checkToken() {
  try {
    let token = localStorage.getItem("token");
    const decoded = decode(token);
    if (
      decoded.hasOwnProperty("name") &&
      decoded.hasOwnProperty("subject") &&
      decoded.hasOwnProperty("iat") &&
      decoded.hasOwnProperty("exp")
    ) {
      return true;
    }
  } catch (err) {
    localStorage.clear();
    return false;
  }
}

function createPrivateRoute(Component) {
  //Creates a render callback for protected pages.
  return localStorage.getItem("token") && checkToken() ? (
    <Component />
  ) : (
    <Redirect to="/login" />
  );
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
    path: "/deck/:id",
    render: () => createPrivateRoute(DeckView),
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
    render: () => createPrivateRoute(Home),
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
