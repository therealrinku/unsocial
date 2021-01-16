import React, { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import overflowToggler from "../utilities/overflowToggler";
import Backdrop from "./Backdrop";
import UserListModal from "./UserListModal";

const CommentsView = ({
  comments,
  likeUnlikeComment,
  currentUserUid,
  deleteComment,
  currentUsername,
  getCommentLikers,
  gettingCommentLikers,
}) => {
  const [showCommentLikers, setShowCommentLikers] = useState(false);
  const [selectedCommentUid, setSelectedCommentUid] = useState(null);
  const [commentIndex, setCommentIndex] = useState(null);
  const [commentLikers, setCommentLikers] = useState(
    comments[commentIndex]?.likers
  );

  const loadCommentLikers = (comment_uid) => {
    setSelectedCommentUid(comment_uid);
    toggleModal(setShowCommentLikers);
  };

  const toggleModal = (setModal) => {
    setModal((prev) => !prev);
    overflowToggler();
  };

  useEffect(() => {
    setCommentIndex(
      comments.findIndex(
        (comment) => comment.comment_uid === selectedCommentUid
      )
    );
    if (!commentLikers && selectedCommentUid) {
      getCommentLikers(selectedCommentUid);
    }
  }, [selectedCommentUid]);

  return (
    <div className="comments--view">
      {comments.map((comment) => {
        return (
          <div key={new Date() * Math.random()} className="comment">
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
                <button onClick={() => loadCommentLikers(comment.comment_uid)}>
                  {comment.comment_likes_count || 0} likes
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
        );
      })}

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
    </div>
  );
};

export default CommentsView;
