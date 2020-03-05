import React from "react";
import * as rtl from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import {GoogleLogin} from "./GoogleLogin";

beforeEach(rtl.cleanup);
jest.mock("../utils/auth.js", () => {
  return {
    isAccountCreationFinished: () => true,
  };
});
describe("GoogleLogin.js ", () => {
  let wrapper;
  test("Renders a spinner if account creation is finished", () => {
    wrapper = rtl.render(
      <BrowserRouter>
        <GoogleLogin
          match={{
            params: {
              token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJuYW1lIjoiYUFTREFTRCAgQURhIiwiaWF0IjoxNTgyODA3MTcyLCJleHAiOjE1ODI4OTM1NzJ9.-5fFa2ejDEKyQOcGKQQ1ypV8OGn0H9KwsvGbfJvs0xc",
            },
          }}
          history={{}}
          addRecoveryPassword={Function.prototype}
          googleAuthorized={Function.prototype}
        />
      </BrowserRouter>
    );
    expect(wrapper.getByTestId("spinner")).toBeVisible();
    wrapper.debug();
  });
});
