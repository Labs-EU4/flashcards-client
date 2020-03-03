// import React from "react";
// import * as rtl from "@testing-library/react";
// import "@testing-library/jest-dom/extend-expect";
// import ConfirmSignUp from "./ConfirmSignUp";
// import * as Axios from "axios";

// // cleaning up
// afterEach(rtl.cleanup);

// //useHistory mock so tests dont crash

// jest.mock("react-router-dom", () => ({
//   useHistory: () => ({
//     push: jest.fn(),
//     location: {
//       pathname: "random/text/okay",
//     },
//   }),
// }));

// //axios mock
// jest.mock("axios");
// let wrapper;

// beforeEach(() => {
//   wrapper = rtl.render(<ConfirmSignUp />);
// });

// describe("is the component rendering correctly", () => {
//   it("renders the loader", () => {
//     let queryValue = wrapper.getByTestId("loader");
//     expect(queryValue).toBeDefined();
//   });

//   it("renders the error", async () => {
//     let error = await wrapper.getByTestId(/alertInvalid/);
//     expect(error).toBeDefined();
//   });

//   it("renders the button", async () => {
//     let button = await wrapper.queryByText(/Return/);
//     expect(button).toBeDefined();
//   });
// });

// describe("success test", () => {
//   it("gives an success if token is valid", async () => {
//     await Axios.get.mockImplementation(() => Promise.resolve({data: null}));
//     let success = wrapper.getByTestId("alertSuccess");
//     expect(success).toBeDefined();
//   });
// });
