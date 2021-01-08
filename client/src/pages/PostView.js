import React, { Fragment } from "react";
import { BiDotsHorizontal } from "react-icons/bi";
import { Link } from "react-router-dom";
import * as Icons from "../Icons/CustomIcons";
import Navbar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";

const PostView = ({
  poster_profileImage,
  poster_username,
  setShowPostOptionsModal,
  toggleModal,
  likeUnlikePost,
  getLikers,
  post_likesCount,
  post_postedDate,
  post_status,
  haveILiked,
  haveISaved,
  saveUnsavePost,
  post_commentsCount,
}) => {
  return (
    <Fragment>
      <Navbar />
      <MobileNavbar />
      <div className="post--view--">
        <section>
          <img src="https://bit.ly/2XnWuDE" alt="img" />
        </section>

        <section>
          <div className="top--section">
            <ul>
              <img
                src={poster_profileImage || "https://bit.ly/2XnWuDE"}
                alt="post_user_image"
              />
              <Link to={`/${poster_username}`}>
                {poster_username || "rinku"}
              </Link>

              <button>Follow</button>
            </ul>

            <ul>
              <button onClick={() => toggleModal(setShowPostOptionsModal)}>
                <BiDotsHorizontal />
              </button>
            </ul>
          </div>

          <div className="comment--view-section"></div>

          <div className="buttons">
            <div className="buttons--section-one">
              <button onClick={likeUnlikePost}>
                {haveILiked ? <Icons.LovedIcon /> : <Icons.LoveIcon />}
              </button>

              <button>
                <Icons.CommentIcon />
              </button>

              <button>
                <Icons.ShareIcon />
              </button>
            </div>

            <div>
              <button onClick={saveUnsavePost}>
                {haveISaved ? <Icons.SavedIcon /> : <Icons.SaveIcon />}
              </button>
            </div>
          </div>

          <div>
            <p>{post_status}</p>
          </div>

          <div>
            <button onClick={getLikers}>{post_likesCount || "No"} likes</button>
            <button>{post_commentsCount || 0} comments</button>
          </div>

          <div className="date">
            <p>{post_postedDate || "date"}</p>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default PostView;
