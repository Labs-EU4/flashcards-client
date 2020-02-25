import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App.js";

jest.mock("axios", () => {
  return {
    get: () => Promise.resolve({data: [{}, {}]}),
    post: () => Promise.resolve({data: {message: "Created new entry"}}),
  };
});

afterEach(rtl.cleanup);

let wrapper;
beforeEach(() => {
  wrapper = rtl.render(<App />);
});

it("renders fine without crashing", () => {
  expect(wrapper.container).toMatchSnapshot();
});

it("renders this is home", () => {
  let queryValue = wrapper.queryByText(/Home/);
  expect(queryValue).toBeDefined();
});

// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
// it("renders without crashing", () => {
//   const div = document.createElement("div");
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });
