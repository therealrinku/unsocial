import React, { Fragment, useEffect } from "react";
import { BiDotsHorizontal } from "react-icons/bi";
import { Link } from "react-router-dom";
import * as Icons from "../Icons/CustomIcons";
import Navbar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";
import * as PostsActions from "../redux/posts/postsActions";
import { connect } from "react-redux";
import Loader from "../components/Loader";

const PostView = ({
  currentUserUid,
  posts,
  setShowPostOptionsModal,
  toggleModal,
  likeUnlikePost,
  getLikers,
  saveUnsavePost,
  match,
  LOAD_POST,
  loading,
}) => {
  const post_id = match.params.post_id;
  const currentPost = posts.filter((post) => post.post_id === post_id);
  console.log(currentPost);

  useEffect(() => {
    if (currentPost.length < 1) {
      LOAD_POST(post_id, currentUserUid);
    }
  }, [currentUserUid, post_id]);

  return (
    <Fragment>
      <Navbar />
      <MobileNavbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="post--view--">
          <section>
            <img src={currentPost[0]?.post_image} alt="img" />
          </section>

          <section>
            <div className="top--section">
              <ul>
                <img
                  src={currentPost[0]?.poster_profileimage}
                  alt="post_user_image"
                />
                <Link to={`/${currentPost[0]?.poster_username}`}>
                  {currentPost[0]?.poster_username || "rinku"}
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

            <div className="absolute--bottom">
              <div className="buttons">
                <div className="buttons--section-one">
                  <button onClick={likeUnlikePost}>
                    {currentPost[0]?.liked_by_me ? (
                      <Icons.LovedIcon />
                    ) : (
                      <Icons.LoveIcon />
                    )}
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
                    {currentPost[0]?.i_have_saved ? (
                      <Icons.SavedIcon />
                    ) : (
                      <Icons.SaveIcon />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <p>{currentPost[0]?.post_status}</p>
              </div>

              <div>
                <button onClick={getLikers}>
                  {currentPost[0]?.post_likes_count || "No"} likes
                </button>
                <button>
                  {currentPost[0]?.post_comments_count || 0} comments
                </button>
              </div>

              <div className="date">
                <p>{currentPost[0]?.post_posted_date}</p>
              </div>
            </div>
          </section>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUserUid: state.user.currentUserData.uid,
    posts: state.posts.posts,
    loading: state.posts.loading_post,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    LOAD_POST: (post_id, current_user_uid) =>
      dispatch(PostsActions.LOAD_POST(post_id, current_user_uid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostView);
