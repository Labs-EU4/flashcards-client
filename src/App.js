import React from "react";
import AppRouter from "./router";
import { Provider } from "react-redux";
import store from "./state/store";
import RegisterForm from './components/RegisterForm'

const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
      <RegisterForm/>
    </Provider>
  );
};

export default App;
