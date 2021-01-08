import React, { Fragment } from "react";
import { BiDotsHorizontal } from "react-icons/bi";
import { Link } from "react-router-dom";

const PostView = ({
  poster_profileImage,
  poster_username,
  setShowPostOptionsModal,
  toggleModal,
}) => {
  return (
    <Fragment>
      <div className="post--view--">
        <div>
          <img src="https://bit.ly/2XnWuDE" alt="img" />
        </div>

        <div>
          <ul>
            <img
              src={poster_profileImage || "https://bit.ly/2XnWuDE"}
              alt="post_user_image"
            />
            <Link to={`/${poster_username}`}>{poster_username || "rinku"}</Link>
          </ul>

          <ul>
            <button onClick={() => toggleModal(setShowPostOptionsModal)}>
              <BiDotsHorizontal />
            </button>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default PostView;
