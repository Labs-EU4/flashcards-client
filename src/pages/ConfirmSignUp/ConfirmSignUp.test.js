import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ConfirmSignUp from "./ConfirmSignUp";
import * as axios from "../../utils/axios";

// jest.mock("../../utils/axios", () => {
//   return {
//     justAxios: () => {
//       return {
//         post: jest.fn().mockResolvedValue({
//           data: {
//             token: "token",
//           },
//         }),
//       };
//     },
//   };

// () => {
//   return {
//     justAxios: () => {
//       return {
//         post: jest.fn().mockResolvedValue({
//           data: {
//             token: "token",
//           },
//         }),
//       };
//     },
//   };

let wrapper;
afterEach(rtl.cleanup);
beforeEach(() => {
  wrapper = rtl.render(<ConfirmSignUp />);
});

// useHistory mock so tests dont crash
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
    location: {
      pathname: "random/text/okay/token",
    },
  }),
  Link: "a",
}));

describe("is the component rendering correctly", () => {
  it("renders the logo", () => {
    jest.mock("../../utils/axios", () => {
      return {
        justAxios: () => {
          return {
            post: jest.fn().mockResolvedValue({
              data: {
                token: "token",
              },
            }),
          };
        },
      };
    });
    let queryValue = wrapper.getByTestId("logo");
    expect(queryValue).toBeInTheDocument();
  });
});

describe("error tests", () => {
  it("it returns an error if token is invalid", async () => {
    jest.mock("../../utils/axios", () => {
      return {
        justAxios: () => {
          return {
            post: jest.fn().mockRejectedValue({data: "error"}),
          };
        },
      };
    });
    await rtl.waitForElement(() => wrapper.getByTestId("alertInvalid"));
    let queryValue = wrapper.getByTestId("alertInvalid");
    expect(queryValue).toBeVisible();
  });

  it("it returns a button if token is invalid", async () => {
    jest.mock("../../utils/axios", () => {
      return {
        justAxios: () => {
          return {
            post: jest.fn().mockRejectedValue({data: "error"}),
          };
        },
      };
    });
    await rtl.waitForElement(() => wrapper.getByTestId("button"));
    let queryValue = wrapper.getByTestId("button");
    expect(queryValue).toBeVisible();
  });
});
