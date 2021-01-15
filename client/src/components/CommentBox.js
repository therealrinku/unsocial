import { connect } from "react-redux";
import { useState } from "react";
import * as postsActions from "../redux/post/postsActions";

const CommentBox = ({
  post_uid,
  post_owner_uid,
  ADD_COMMENT,
  currentUserUid,
  addingComment,
}) => {
  const [comment, setComment] = useState("");

  const addComment = (e) => {
    e.preventDefault();
    if (comment.trim().length > 3) {
      ADD_COMMENT(
        comment,
        currentUserUid,
        post_uid,
        post_owner_uid,
        `${new Date()}`
      );
      setComment("");
    }
  };

  return (
    <div className="comment--box">
      <form onSubmit={addComment}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add comment.."
        />
        <button disabled={comment.trim().length <= 3 || addingComment}>
          Post
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUserUid: state.user.currentUserData.uid,
    addingComment: state.posts.adding_comment,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ADD_COMMENT: (
      comment,
      commenter_uid,
      post_uid,
      post_owner_uid,
      posted_date
    ) =>
      dispatch(
        postsActions.ADD_COMMENT(
          comment,
          commenter_uid,
          post_uid,
          post_owner_uid,
          posted_date
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentBox);
