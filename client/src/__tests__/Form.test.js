import Form from "../components/Form";
import "@testing-library/jest-dom";
import { cleanup, render, screen } from "@testing-library/react";

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

// test("If three dots are shown after clicking sign in", () => {
//   let loading = false;
//   const handleClick = jest.fn(() => {
//     console.log("dd");
//     loading = true;
//   });
//   render(
//     <Form formType="Login" loading={loading} username="username" password="password" onFormSubmit={handleClick} />
//   );
//   const submitBtn = screen.getByText("Login");
//   userEvent.click(submitBtn);
//   expect(handleClick).toHaveBeenCalledTimes(1);
//   //expect(submitBtn).toContain("...");
// });
