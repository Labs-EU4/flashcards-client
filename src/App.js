import React from "react";
import "antd/dist/antd.css";
import AppRouter from "./router";
import "antd/dist/antd.css";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

const App = () => {
  return (
    <ErrorBoundary render={() => <h1>Oops</h1>}>
      <AppRouter />
    </ErrorBoundary>
  );
};

export default App;
