import React from "react";
import AppRouter from "./router";
<<<<<<< HEAD
import { Provider } from "react-redux";
import store from "./state/store";
import RegisterForm from "./components/RegisterForm";
import { PrivateRoute } from "./router/PrivateRoute";
import { Route, withRouter } from "react-router-dom";

const App = () => {
  return (
    <Provider store={store}>
      <PrivateRoute exact path="/" component={AppRouter} />
      <Route path="/register" component={RegisterForm} />
    </Provider>
  );
=======

const App = () => {
  return <AppRouter />;
>>>>>>> 9cd6aa222679bad1ace12239ed888b8000003758
};

export default withRouter(App);
