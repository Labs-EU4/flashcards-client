import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DeckLibrary from "./DeckLibrary";
import {MemoryRouter} from "react-router-dom";

let wrapper;
beforeEach(() => {
  wrapper = rtl.render(
    <MemoryRouter>
      <DeckLibrary />
    </MemoryRouter>
  );
});

const LibraryContainer = () => {
  return wrapper.queryByTestId("LibraryContainer");
};

const DeckCard = () => {
  return wrapper.queryAllByRole("deck");
};

it("renders without crashing", () => {
  expect(wrapper.container).toMatchSnapshot();
});

it("renders correct elements before response is received", () => {
  expect(LibraryContainer()).toBeInTheDocument();
  expect(DeckCard()[0]).not.toBeDefined();
  expect(DeckCard()).toHaveLength(0);
});

// jest.mock("../../helpers/axiosWithAuth", () => {
//   return () =>
//     Promise.resolve({
//       data: {
//         data: [
//           {
//             name: "Statistical Learning",
//             user_id: 1,
//             public: true,
//           },
//           {
//             name: "Economics",
//             user_id: 1,
//             public: true,
//           },
//           {
//             name: "Maths",
//             user_id: 1,
//             public: true,
//           },
//         ],
//       },
//     });
// });

// it("renders response data correctly", async () => {
//   await axiosWithAuth();
//   expect(axiosWithAuth).toHaveBeenCalledTimes(1);
// });

afterEach(rtl.cleanup);
