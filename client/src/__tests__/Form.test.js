import Form from "../components/Form";
import "@testing-library/jest-dom";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { loginUser } from "../services/authServices";

afterEach(() => {
  cleanup();
});

test("If submit button is disabled in login page if username and password are less than 5 characters", () => {
  render(<Form formType="Login" username="user" password="pass" />);
  expect(screen.getByText("Login")).toBeDisabled();
});

test("If submit button is enabled in login page if username and password are more than 5 characters", () => {
  render(<Form formType="Login" username="username" password="password" />);
  expect(screen.getByText("Login")).toBeEnabled();
});

test("if signup form is disabled when email,username or password are less than 5 characters long", () => {
  render(<Form formType="Register" email="hellfelfllfl" password="dddd" username="d" />);
  expect(screen.getByText("Register")).toBeDisabled();
});

test("If three dots are shown after clicking sign in", () => {
  const { rerender } = render(<Form formType="Login" loading={false} username="username" password="password" />);
  const submitButton = screen.getByText("Login");
  expect(submitButton).toBeInTheDocument();

  //re render when loading is true;
  rerender(<Form formType="Login" loading={true} username="username" password="password" />);
  expect(screen.getByText("...")).toBeInTheDocument();
});

// test("If login is successful when user logins with matching credentials", () => {
//   const onSubmit = (username, password) => console.log(username, password);
//   // loginUser(username, password).then((res) => {
//   //   console.log("dj");
//   //   expect(res.token).toBeDefined();
//   // });
//   render(<Form formType="Login" loading={false} username="username" password="password" onFormSubmit={onSubmit} />);
//   const submitButton = screen.getByText("Login");
//   userEvent.click(submitButton);
// });
