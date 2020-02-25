import React from "react";
import AppRouter from "./router";
import { Provider } from "react-redux";
import store from "./state/store";
import RegisterForm from "./components/RegisterForm";
import { PrivateRoute } from "./router/PrivateRoute";
import { Route, withRouter } from "react-router-dom";
import "./CSS/index.css";

const App = () => {
  return (
    <Provider store={store}>
      <PrivateRoute exact path="/" component={AppRouter} />
      <Route path="/register" component={RegisterForm} />
    </Provider>
  );
};

export default withRouter(App);
