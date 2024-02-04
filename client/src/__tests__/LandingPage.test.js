import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import LandingPage from "../pages/LandingPage";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../redux/store";

afterEach(() => {
  cleanup();
});

test("login button is disabled initially", () => {
  render(
    <Router>
      <Provider store={store}>
        <LandingPage />{" "}
      </Provider>
    </Router>
  );

  expect(screen.getByRole("login-btn")).toBeDisabled();
});

test("login button is disabled when user enters username only", () => {
  render(
    <Router>
      <Provider store={store}>
        <LandingPage />{" "}
      </Provider>
    </Router>
  );

  userEvent.type(screen.getByTestId("username"), "testemail@mailbox.com");

  expect(screen.getByRole("login-btn")).toBeDisabled();
});

test("login button is disabled when user enters password only", () => {
  render(
    <Router>
      <Provider store={store}>
        <LandingPage />{" "}
      </Provider>
    </Router>
  );

  userEvent.type(screen.getByTestId("password"), "testpassword");

  expect(screen.getByRole("login-btn")).toBeDisabled();
});

test("login button is enabled once user types both username and password", () => {
  render(
    <Router>
      <Provider store={store}>
        <LandingPage />{" "}
      </Provider>
    </Router>
  );

  userEvent.type(screen.getByTestId("username"), "testemail@mailbox.com");
  userEvent.type(screen.getByTestId("password"), "test_password");

  expect(screen.getByRole("login-btn")).toBeEnabled();
});
