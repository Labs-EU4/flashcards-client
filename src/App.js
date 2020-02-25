import React from "react";
import AppRouter from "./router";
import RegisterForm from "./pages/RegisterForm";
import {PrivateRoute} from "./router/PrivateRoute";
import {Route, withRouter} from "react-router-dom";
import "./CSS/index.css";

const App = () => {
  return (
    // <>
    //   <PrivateRoute exact path="/" component={AppRouter} />
    //   <Route path="/register" component={RegisterForm} />
    // </>
    <AppRouter />
  );
};

export default App;
