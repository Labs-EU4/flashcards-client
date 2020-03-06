import React from "react";
import * as rtl from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";

test("Renders", async () => {
  const wrapper = rtl.render(
    <ErrorBoundary>
      <button
        onClick={() => {
          throw new Error("BOO");
        }}
      >
        hey
      </button>
    </ErrorBoundary>
  );
  rtl.fireEvent.click(wrapper.getByText(/hey/));
  //   expect(await wrapper.findByText(/Report feedback/)).toBeInTheDocument();
});
