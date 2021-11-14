import { useState } from "react";
import { useHistory } from "react-router-dom";
import Modal from "../Modal";
import {
  FiCornerUpRight,
  FiTrash2,
  FiClipboard,
  FiX,
  FiAlertCircle,
} from "react-icons/fi";
import styles from "./PostOptionsView.module.scss";

type PostOptionsViewTypes = {
  post_id: string;
  isMyPost: boolean;
  toggle: any;
  deletePost: any;
  AddMessage: any;
};

const PostOptionsView = ({
  post_id,
  isMyPost,
  toggle,
  deletePost,
  AddMessage,
}: PostOptionsViewTypes) => {
  const [showDeleteConfirmer, setShowDeleteConfirmer] = useState(false);
  const history = useHistory();

  const goToPost = () => {
    toggle();
    history.push(`/p/${post_id}`);
  };

  const copyToClipBoard = () => {
    toggle();
    navigator.clipboard.writeText(`https://uns0cial.web.app/p/${post_id}`);
    AddMessage("Link successfully copied to clipboard.");
    setTimeout(() => {
      AddMessage(null);
    }, 3000);
  };

  return (
    <Modal hideTitleBar>
      <div className={styles.PostOptionsView}>
        {showDeleteConfirmer ? (
          <div className={styles.DeleteView}>
            <div>
              <p>Are you sure want to delete this post?</p>
            </div>

            <div>
              <button style={{ color: "tomato" }} onClick={deletePost}>
                <FiTrash2 />
                <p>Delete</p>
              </button>
              <button onClick={toggle}>
                <FiX />
                <p>Cancel</p>
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.PostOptions}>
            <button onClick={goToPost}>
              <FiCornerUpRight />
              <p>Go to post</p>
            </button>
            {!isMyPost && (
              <button onClick={toggle}>
                <FiAlertCircle />
                <p>Report</p>
              </button>
            )}
            {isMyPost && (
              <button onClick={() => setShowDeleteConfirmer((prev) => !prev)}>
                <FiTrash2 />
                <p>Delete</p>
              </button>
            )}
            <button onClick={copyToClipBoard}>
              <FiClipboard />
              <p>Copy link</p>
            </button>
            <button onClick={toggle}>
              <FiX />
              <p>Cancel</p>
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default PostOptionsView;
