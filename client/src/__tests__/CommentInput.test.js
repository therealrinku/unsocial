import CommentInput from "../components/CommentInput";
import { cleanup, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../redux/store";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

afterEach(() => {
  cleanup();
});

test("Is post button disabled if comment length is less than or equal to 3", () => {
  render(
    <Provider store={store}>
      <CommentInput />
    </Provider>
  );

  userEvent.type(screen.getByPlaceholderText("Add comment.."), "hi");
  expect(screen.getByRole("button", { name: /Post/i })).toBeDisabled();
});

test("Is post button enabled if comment length is more than 3", () => {
  render(
    <Provider store={store}>
      <CommentInput />
    </Provider>
  );

  userEvent.type(screen.getByPlaceholderText("Add comment.."), "hi jest and react testing library");
  expect(screen.getByRole("button", { name: /Post/i })).toBeEnabled();
});
