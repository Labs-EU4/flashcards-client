import React from "react";
import "antd/dist/antd.css";
import AppRouter from "./router";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  return (
    <ErrorBoundary render={() => <h1>Oops</h1>}>
      <AppRouter />
    </ErrorBoundary>
  );
};

export default App;
