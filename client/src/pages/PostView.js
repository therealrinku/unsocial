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
  feedPosts,
  currentUsername,
  currentUserUid,
  posts,
  setShowPostOptionsModal,
  toggleModal,
  getLikers,
  match,
  LOAD_POST,
  loading,
  LIKE_POST,
  UNLIKE_POST,
  SAVE_POST,
  UNSAVE_POST,
}) => {
  const post_id = match.params.post_id;
  const currentPost = posts.filter((post) => post.post_id === post_id);
  const post_uid = currentPost[0]?.post_uid;
  const haveILiked = currentPost[0]?.liked_by_me;
  const haveISaved = currentPost[0]?.i_have_saved;
  const postExistsInFeed =
    feedPosts.findIndex((post) => post.post_id === post_id) >= 0;

  console.log(postExistsInFeed);

  const likeUnlikePost = () => {
    if (haveILiked) {
      UNLIKE_POST(post_uid, currentUserUid, postExistsInFeed);
    } else {
      LIKE_POST(post_uid, currentUserUid, postExistsInFeed);
    }
  };

  const saveUnsavePost = () => {
    if (haveISaved) {
      UNSAVE_POST(post_uid, currentUsername, postExistsInFeed);
    } else {
      SAVE_POST(post_uid, currentUsername, postExistsInFeed);
    }
  };

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
    feedPosts: state.feed.posts,
    currentUsername: state.user.currentUserData.username,
    currentUserUid: state.user.currentUserData.uid,
    posts: state.posts.posts,
    loading: state.posts.loading_post,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SAVE_POST: (post_uid, saver_username, post_exists_in_feed) =>
      dispatch(
        PostsActions.SAVE_POST(post_uid, saver_username, post_exists_in_feed)
      ),
    UNSAVE_POST: (post_uid, unsaver_username, post_exists_in_feed) =>
      dispatch(
        PostsActions.UNSAVE_POST(
          post_uid,
          unsaver_username,
          post_exists_in_feed
        )
      ),
    LIKE_POST: (post_uid, liker_uid, post_exists_in_feed) =>
      dispatch(
        PostsActions.LIKE_POST(post_uid, liker_uid, post_exists_in_feed)
      ),
    UNLIKE_POST: (post_uid, unliker_uid, post_exists_in_feed) =>
      dispatch(
        PostsActions.UNLIKE_POST(post_uid, unliker_uid, post_exists_in_feed)
      ),
    LOAD_POST: (post_id, current_user_uid) =>
      dispatch(PostsActions.LOAD_POST(post_id, current_user_uid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostView);
