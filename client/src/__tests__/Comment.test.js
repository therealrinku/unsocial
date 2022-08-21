import Comment from "../components/Comment";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

test("if the likeUnlike button text is 'unlike' if i have liked the post", () => {
  render(<Comment comment={{ liked_by_me: true }} comments={[]} />);

  expect(screen.getByTestId("likeUnlikeButton").textContent).toEqual("unlike");
});

test("if the likeUnlike button text is 'like' if i have not liked the post", () => {
  render(<Comment comment={{ liked_by_me: false }} comments={[]} />);

  expect(screen.getByTestId("likeUnlikeButton").textContent).toEqual("like");
});

test("if the delete comment button is visible if i am the owner of the post", () => {
  render(
    <Comment
      currentUsername="abel"
      comment={{ liked_by_me: false, post_owner_uid: 1 }}
      comments={[]}
      currentUserUid={1}
    />
  );

  expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
});

test("if the delete comment button is visible if i am the poster of the comment", () => {
  render(
    <Comment
      currentUsername="abel"
      comment={{ liked_by_me: false, poster_username: "abel" }}
      comments={[]}
      currentUserUid={1}
    />
  );

  expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
});
