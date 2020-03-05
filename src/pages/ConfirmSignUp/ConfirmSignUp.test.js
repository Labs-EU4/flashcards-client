import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ConfirmSignUp from "./ConfirmSignUp";
import * as axios from "axios";

// cleaning up
afterEach(rtl.cleanup);

// useHistory mock so tests dont crash

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
    location: {
      pathname: "random/text/okay/token",
    },
  }),
}));

let wrapper;

beforeEach(() => {
  wrapper = rtl.render(<ConfirmSignUp />);
});
