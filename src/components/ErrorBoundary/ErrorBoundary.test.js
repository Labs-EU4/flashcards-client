import React from "react";
import {render, fireEvent, screen} from "@testing-library/react";
import * as Sentry from "@sentry/browser";
import ErrorBoundary from "./ErrorBoundary";

class Bomb extends React.Component {
  render() {
    return this["💣"].caboom();
  }
}

class BombButton extends React.Component {
  state = {renderBomb: false};
  handleBombClick = () => this.setState({renderBomb: true});
  render() {
    return (
      <ErrorBoundary>
        {this.state.renderBomb ? (
          <Bomb />
        ) : (
          <button onClick={this.handleBombClick}>
            <span role="img" aria-label="bomb">
              💣
            </span>
          </button>
        )}
      </ErrorBoundary>
    );
  }
}

jest.mock("@sentry/browser", () => {
  return {
    withScope: jest.fn(),
    captureException: jest.fn(),
    showReportDialog: jest.fn(),
  };
});

beforeEach(() => {
  // when the error's thrown a bunch of console.errors are called even though
  // the error boundary handles the error. This makes the test output noisy,
  // so we'll mock out console.error
  jest.spyOn(console, "error");
  console.error.mockImplementation(() => {});
});

afterEach(() => {
  console.error.mockRestore();
});

test("calls reportError and renders that there was a problem", () => {
  // Arrange
  render(<BombButton />);

  // Act
  fireEvent.click(screen.getByText("💣"));

  // Assert
  expect(Sentry.withScope).toHaveBeenCalledTimes(1);
  const error = expect.any(TypeError);
  const info = {componentStack: expect.stringContaining("BombButton")};
  // expect(Sentry.captureException).toHaveBeenCalledWith(error);

  expect(screen.getByText(/Report feedback/i)).toBeInTheDocument();

  // by mocking out console.error we may inadvertantly be missing out on logs
  // in the future that could be important, so let's reduce that liklihood by
  // adding an assertion for how frequently console.error is called.
  expect(console.error).toHaveBeenCalledTimes(2);
});
