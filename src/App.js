import React from "react";
import AppRouter from "./router";
import { Provider } from "react-redux";
import store from "./state/store";

const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default App;
