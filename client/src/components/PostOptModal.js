import React, { useState } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { FiNavigation, FiTrash, FiClipboard, FiX, FiAlertOctagon, FiEdit, FiEyeOff } from "react-icons/all";

const PostOptModal = ({ post_id, isMyPost, toggle, deletePost, AddMessage }) => {
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
      AddMessage(null);
    }, 3000);
  };

  return (
    <div className="post--options-modal">
      {showDeleteConfirmer ? (
        <div className="delete--confirmer-popup">
          <div>
            <p>Are you sure to Delete this Post?</p>
          </div>

          <div>
            <button style={{ color: "red" }} onClick={deletePost}>
              <FiTrash />
              <p>Delete</p>
            </button>
            <button onClick={toggle}>
              <FiX />
              <p>Cancel</p>
            </button>
          </div>
        </div>
      ) : (
        <div className="post--options">
          <button onClick={goToPost}>
            <FiNavigation />
            <p>Go to post</p>
          </button>
          <button style={!isMyPost ? { display: "none" } : null} disabled>
            <FiEdit />
            <p>Edit Status(ud)</p>
          </button>
          <button style={isMyPost ? { display: "none" } : { color: "tomato" }} onClick={toggle}>
            <FiAlertOctagon />
            <p>Report</p>
          </button>
          <button onClick={copyToClipBoard} disabled>
            <FiEyeOff />
            <p>Hide this post(ud)</p>
          </button>
          <button
            style={!isMyPost ? { display: "none" } : { color: "tomato" }}
            onClick={() => setShowDeleteConfirmer((prev) => !prev)}
          >
            <FiTrash />
            <p>Delete</p>
          </button>
          <button onClick={copyToClipBoard}>
            <FiClipboard />
            <p>Copy Link</p>
          </button>
          <button onClick={toggle}>
            <FiX />
            <p>Cancel</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default withRouter(PostOptModal);
