import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Dashboard from "./Dashboard";
import {MemoryRouter} from "react-router-dom";

let wrapper;
beforeEach(() => {
  wrapper = rtl.render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  );
});

describe("Dashboard", () => {
  it("should be able to run tests", () => {
    expect(2 + 2).toEqual(4);
  });
});
