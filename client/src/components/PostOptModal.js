import React, { useState } from "react";
import { withRouter, useHistory } from "react-router-dom";

const PostOptModal = ({
  post_id,
  isMyPost,
  toggle,
  deletePost,
  AddMessage,
  ClearMessage,
}) => {
  const [showDeleteConfirmer, setShowDeleteConfirmer] = useState(false);
  const history = useHistory();

  const goToPost = () => {
    toggle();
    history.push(`/p/${post_id}`);
  };

  const copyToClipBoard = () => {
    toggle();
    navigator.clipboard.writeText(`https://instacloone.web.app/p/${post_id}`);
    AddMessage("Link successfully copied to clipboard.");
    setTimeout(() => {
      ClearMessage();
    }, 3000);
  };

  return (
    <div className="post--options-modal">
      {showDeleteConfirmer ? (
        <div className="delete--confirmer-popup">
          <div>
            <p>Delete Post?</p>
            <p>Are you sure want to delete this post?</p>
          </div>

          <div>
            <button style={{ color: "red" }} onClick={deletePost}>
              Delete
            </button>
            <button onClick={toggle}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="post--options">
          <button onClick={goToPost}>Go to post</button>
          <button
            style={isMyPost ? { display: "none" } : { color: "red" }}
            onClick={toggle}
          >
            Report
          </button>
          <button
            style={!isMyPost ? { display: "none" } : { color: "red" }}
            onClick={() => setShowDeleteConfirmer((prev) => !prev)}
          >
            Delete
          </button>
          <button onClick={copyToClipBoard}>Copy Link</button>
          <button onClick={toggle}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default withRouter(PostOptModal);
