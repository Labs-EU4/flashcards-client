import React from "react";
import * as rtl from "@testing-library/react";
import SetRecoveryPasswordForm from "./SetRecoveryPassword";

let wrapper;
let token = "boop";
let addRecoveryPassword = jest.fn();
let history = {
  push: jest.fn(),
};
const button = () => wrapper.getByTestId("submit");
const password = () => wrapper.getByPlaceholderText(/Password/);
const confirm = () => wrapper.getByPlaceholderText(/Confirm password/);
beforeEach(() => {
  wrapper = rtl.render(
    <SetRecoveryPasswordForm
      token={token}
      addRecoveryPassword={addRecoveryPassword}
      history={history}
    />
  );
});

describe("Set recovery password form", () => {
  test("Renders appropriate elements", () => {
    expect(button()).toBeVisible();
    expect(password()).toBeVisible();
    expect(confirm()).toBeVisible();
  });
  test("Create password button is disabled by default", () => {
    expect(button()).toBeDisabled();
  });
  test("Create password button is disabled if there are validation errors", () => {
    rtl.fireEvent.change(password(), {target: {value: "12345"}});
    rtl.fireEvent.change(confirm(), {target: {value: "54321"}});
    expect(wrapper.getByText(/Passwords do not match!/)).toBeVisible();
    expect(button()).toBeDisabled();
  });
  test("Calls the action with correct values on submit", async () => {
    addRecoveryPassword.mockResolvedValueOnce("Something went wrong!");
    rtl.fireEvent.change(password(), {target: {value: "12345"}});
    rtl.fireEvent.change(confirm(), {target: {value: "12345"}});
    rtl.fireEvent.click(button());
    expect(addRecoveryPassword.mock.calls[0]).toMatchInlineSnapshot(`
      Array [
        "12345",
        "boop",
      ]
    `);
    await rtl.wait(() => expect(history.push).toHaveBeenCalledTimes(1));
  });
  test("Displays network error in an alert", async () => {
    addRecoveryPassword.mockRejectedValueOnce("Something went wrong!");
    rtl.fireEvent.change(password(), {target: {value: "12345"}});
    rtl.fireEvent.change(confirm(), {target: {value: "12345"}});
    rtl.fireEvent.click(button());
    expect(await wrapper.findByText(/Something went wrong!/)).toBeVisible();
  });
});
