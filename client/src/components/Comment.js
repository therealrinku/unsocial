import { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import overflowToggler from "../utilities/overflowToggler";
import Backdrop from "./Backdrop";
import UserListModal from "./UserListModal";

const Comment = ({
  comments,
  comment,
  likeUnlikeComment,
  currentUserUid,
  currentUsername,
  deleteComment,
  getCommentLikers,
  gettingCommentLikers,
}) => {
  const [showCommentLikers, setShowCommentLikers] = useState(false);
  const commentLikers = comments.filter(
    (cmt) => cmt.comment_uid === comment.comment_uid
  )[0]?.likers;

  const toggleModal = (setModal) => {
    setModal((prev) => !prev);
    overflowToggler();
  };

  const loadCommentLikers = () => {
    toggleModal(setShowCommentLikers);
    if (!commentLikers) {
      getCommentLikers(comment.comment_uid);
    }
  };

  return (
    <Fragment>
      <div className="comment">
        <img src={comment.poster_profile_image} alt="profile-image" />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <p className="username--comment">
              <NavLink to={`/${comment.poster_username}`}>
                {comment.poster_username}
              </NavLink>{" "}
              {comment.comment}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "-15px",
            }}
          >
            <p>1h</p>
            <button onClick={loadCommentLikers}>
              {comment.comment_likes_count || 0}{" "}
              {comment.comment_likes_count === 1 ? "like" : "likes"}
            </button>
            <button
              onClick={() =>
                likeUnlikeComment(
                  comment.liked_by_me ? "unlike" : "like",
                  comment.comment_uid
                )
              }
            >
              {comment.liked_by_me ? "unlike" : "like"}
            </button>
            <button
              style={
                currentUserUid === comment.post_owner_uid ||
                currentUsername === comment.poster_username
                  ? { color: "red" }
                  : { display: "none" }
              }
              onClick={() => deleteComment(comment.comment_uid)}
            >
              delete
            </button>
          </div>
        </div>
      </div>

      {showCommentLikers ? (
        <Fragment>
          <UserListModal
            title="Likes"
            loading={gettingCommentLikers}
            toggle={() => toggleModal(setShowCommentLikers)}
            users={commentLikers || []}
          />
          <Backdrop
            show={showCommentLikers}
            toggle={() => toggleModal(setShowCommentLikers)}
          />
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default Comment;
