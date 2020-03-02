import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ResetPassword from "./ResetPassword.js";

afterEach(rtl.cleanup);

let wrapper;
beforeEach(() => {
  wrapper = rtl.render(<ResetPassword />);
});
