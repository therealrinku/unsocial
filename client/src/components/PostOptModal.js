import React, { useState } from "react";
import { withRouter, useHistory } from "react-router-dom";

const PostOptModal = ({ post_id, post_uid, isMyPost, toggle, deletePost }) => {
  const [showDeleteConfirmer, setShowDeleteConfirmer] = useState(false);

  return (
    <div className="post--options-modal">
      {showDeleteConfirmer ? (
        <div className="delete--confirmer-popup">
          <div>
            <p>Delete Post?</p>
            <p>Are you sure want to delete this post?</p>
          </div>

          <div>
            <button
              style={{ color: "red" }}
              onClick={() => deletePost(post_uid)}
            >
              Delete
            </button>
            <button onClick={toggle}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="post--options">
          <button onClick={() => useHistory.push(`/p/${post_id}`)}>
            Go to post
          </button>
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
          <button>Copy Link</button>
          <button onClick={toggle}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default withRouter(PostOptModal);
