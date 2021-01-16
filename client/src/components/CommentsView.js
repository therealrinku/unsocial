import React from "react";
import { NavLink } from "react-router-dom";

const CommentsView = ({
  comments,
  likeUnlikeComment,
  currentUserUid,
  deleteComment,
  currentUsername,
}) => {
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
                <button>{comment.comment_likes_count || 0} likes</button>
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
    </div>
  );
};

export default CommentsView;
