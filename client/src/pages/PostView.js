import React, { Fragment, useEffect, useState } from "react";
import { BiDotsHorizontal } from "react-icons/bi";
import { Link } from "react-router-dom";
import * as Icons from "../Icons/CustomIcons";
import Navbar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";
import * as PostsActions from "../redux/post/postsActions";
import { connect } from "react-redux";
import Loader from "../components/Loader";
import overflowToggler from "../utilities/overflowToggler";
import Backdrop from "../components/Backdrop";
import PostOptModal from "../components/PostOptModal";
import UsersListModal from "../components/UserListModal";
import CommentBox from "../components/CommentBox";

const PostView = ({
  currentUsername,
  currentUserUid,
  posts,
  match,
  history,
  LOAD_POST,
  loading,
  LIKE_POST,
  UNLIKE_POST,
  SAVE_POST,
  UNSAVE_POST,
  GET_LIKERS,
  loadingLikers,
  DELETE_POST,
}) => {
  //modal
  const [showPostOptionsModal, setShowPostOptionsModal] = useState(false);
  const [showLikersModal, setShowLikersModal] = useState(false);

  //checking image is loaded
  const [imageIsLoaded, setImageIsLoaded] = useState(false);

  const toggleModal = (setModal) => {
    setModal((prev) => !prev);
    overflowToggler();
  };

  const post_id = match.params.post_id;
  const currentPost = posts.filter((post) => post.post_id === post_id);

  const thisPostLikers = currentPost[0]?.post_likers;

  const post_uid = currentPost[0]?.post_uid;
  const haveILiked = currentPost[0]?.liked_by_me;
  const haveISaved = currentPost[0]?.i_have_saved;

  const likeUnlikePost = () => {
    if (haveILiked) {
      UNLIKE_POST(post_uid, currentUserUid);
    } else {
      LIKE_POST(post_uid, currentUserUid);
    }
  };

  const saveUnsavePost = () => {
    if (haveISaved) {
      UNSAVE_POST(post_uid, currentUsername);
    } else {
      SAVE_POST(post_uid, currentUsername);
    }
  };

  const getLikers = () => {
    toggleModal(setShowLikersModal);
    if (!thisPostLikers) {
      GET_LIKERS(post_uid);
    }
  };

  const deletePost = () => {
    toggleModal(setShowPostOptionsModal);
    DELETE_POST(post_uid);
    history.goBack();
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
            post_id={post_id}
            deletePost={deletePost}
          />
        </Fragment>
      ) : null}

      <Navbar />
      <MobileNavbar />
      {loading ? (
        <Loader />
      ) : //checking if post exiists
      !loading && !currentPost[0]?.post_image ? (
        <p
          style={{ marginTop: "100px", textAlign: "center", fontSize: "15px" }}
        >
          Post deleted or something went wrong!
        </p>
      ) : (
        <Fragment>
          <div
            className="post--view--"
            style={!imageIsLoaded ? { display: "none" } : null}
          >
            <section>
              <img
                onLoad={() => setImageIsLoaded(true)}
                src={currentPost[0]?.post_image}
              />
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
                    {currentPost[0]?.post_likes_count || "No"} likes
                  </button>
                  <button>
                    {currentPost[0]?.post_comments_count || 0} comments
                  </button>
                </div>

                <div className="date">
                  <p>{currentPost[0]?.post_posted_date}</p>
                </div>

                <CommentBox
                  post_uid={post_uid}
                  post_owner_uid={currentPost[0]?.poster_uid}
                />
              </div>
            </section>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    loadingLikers: state.posts.loading_likers,
    currentUsername: state.user.currentUserData.username,
    currentUserUid: state.user.currentUserData.uid,
    posts: state.posts.posts,
    loading: state.posts.loading_post,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    DELETE_POST: (post_uid) => dispatch(PostsActions.DELETE_POST(post_uid)),
    GET_LIKERS: (post_uid) => dispatch(PostsActions.GET_LIKERS(post_uid)),
    SAVE_POST: (post_uid, saver_username) =>
      dispatch(PostsActions.SAVE_POST(post_uid, saver_username)),
    UNSAVE_POST: (post_uid, unsaver_username) =>
      dispatch(PostsActions.UNSAVE_POST(post_uid, unsaver_username)),
    LIKE_POST: (post_uid, liker_uid) =>
      dispatch(PostsActions.LIKE_POST(post_uid, liker_uid)),
    UNLIKE_POST: (post_uid, unliker_uid) =>
      dispatch(PostsActions.UNLIKE_POST(post_uid, unliker_uid)),
    LOAD_POST: (post_id, current_user_uid) =>
      dispatch(PostsActions.GET_POST(post_id, current_user_uid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostView);
