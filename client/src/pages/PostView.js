import React, { Fragment, useEffect, useState } from "react";
import { BiDotsHorizontal } from "react-icons/bi";
import { Link } from "react-router-dom";
import * as Icons from "../Icons/CustomIcons";
import Navbar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";
import * as PostsActions from "../redux/posts/postsActions";
import { connect } from "react-redux";
import Loader from "../components/Loader";
import overflowToggler from "../utilities/overflowToggler";
import Backdrop from "../components/Backdrop";
import PostOptModal from "../components/PostOptModal";
import UsersListModal from "../components/UserListModal";

const PostView = ({
  feedPosts,
  currentUsername,
  currentUserUid,
  posts,
  match,
  LOAD_POST,
  loading,
  LIKE_POST,
  UNLIKE_POST,
  SAVE_POST,
  UNSAVE_POST,
  GET_LIKERS,
  loadingLikers,
}) => {
  //modal
  const [showPostOptionsModal, setShowPostOptionsModal] = useState(false);
  const [showLikersModal, setShowLikersModal] = useState(false);

  const toggleModal = (setModal) => {
    setModal((prev) => !prev);
    overflowToggler();
  };

  const post_id = match.params.post_id;
  const currentPost = posts.filter((post) => post.post_id === post_id);
  const postExistsInFeed =
    feedPosts.findIndex((post) => post.post_id === post_id) >= 0;
  const thisPostInFeed = feedPosts.filter((post) => post.post_id === post_id);

  const thisPostLikers = currentPost[0]?.post_likers;

  const post_uid = currentPost[0]?.post_uid;
  const haveILiked = postExistsInFeed
    ? thisPostInFeed[0]?.liked_by_me
    : currentPost[0]?.liked_by_me;
  const haveISaved = postExistsInFeed
    ? thisPostInFeed[0]?.i_have_saved
    : currentPost[0]?.i_have_saved;
  const postLikesCount = postExistsInFeed
    ? thisPostInFeed[0]?.post_likes_count
    : currentPost[0]?.post_likes_count;

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

  const getLikers = () => {
    toggleModal(setShowLikersModal);
    if (!thisPostLikers) {
      GET_LIKERS(post_uid);
    }
  };

  useEffect(() => {
    if (currentPost.length < 1) {
      LOAD_POST(post_id, currentUserUid);
    }
  }, [currentUserUid, post_id]);

  return (
    <Fragment>
      {showLikersModal ? (
        <Fragment>
          <UsersListModal
            users={thisPostLikers || []}
            title="Likers"
            toggle={() => toggleModal(setShowLikersModal)}
            loading={loadingLikers}
          />
          <Backdrop
            show={showLikersModal}
            toggle={() => toggleModal(setShowLikersModal)}
          />
        </Fragment>
      ) : null}

      {showPostOptionsModal ? (
        <Fragment>
          <Backdrop
            show={showPostOptionsModal}
            toggle={() => toggleModal(setShowPostOptionsModal)}
          />
          <PostOptModal
            isMyPost={currentPost[0].poster_username === currentUsername}
            toggle={() => toggleModal(setShowPostOptionsModal)}
            post_uid={post_uid}
            post_id={post_id}
          />
        </Fragment>
      ) : null}

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
                  {postLikesCount || "No"} likes
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
    loadingLikers: state.posts.loading_likers,
    feedPosts: state.feed.posts,
    currentUsername: state.user.currentUserData.username,
    currentUserUid: state.user.currentUserData.uid,
    posts: state.posts.posts,
    loading: state.posts.loading_post,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GET_LIKERS: (post_uid) => dispatch(PostsActions.GET_LIKERS(post_uid)),
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
