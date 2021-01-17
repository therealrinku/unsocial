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
import CommentsView from "../components/CommentsView";
import { deleteComment, getCommentLikers } from "../services/commentServices";
import LoginNeededPrompt from "../components/LoginNeededPrompt";

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
  GET_COMMENTS,
  LIKE_COMMENT,
  UNLIKE_COMMENT,
  DELETE_COMMENT,
  GET_COMMENT_LIKERS,
  gettingCommentLikers,
  userDataLoaded,
  token,
}) => {
  //modal
  const [showPostOptionsModal, setShowPostOptionsModal] = useState(false);
  const [showLikersModal, setShowLikersModal] = useState(false);
  const [showLoginNeededPrompt, setShowLoginNeededPrompt] = useState(false);

  //checking image is loaded
  const [imageIsLoaded, setImageIsLoaded] = useState(false);

  const toggleModal = (setModal) => {
    setModal((prev) => !prev);
    overflowToggler();
  };

  const post_id = match.params.post_id;
  const currentPost = posts.filter((post) => post.post_id === post_id);

  const thisPostLikers = currentPost[0]?.post_likers;
  const thisPostComments = currentPost[0]?.comments;

  const post_uid = currentPost[0]?.post_uid;
  const haveILiked = currentPost[0]?.liked_by_me;
  const haveISaved = currentPost[0]?.i_have_saved;

  const likeUnlikePost = () => {
    if (currentUserUid) {
      if (haveILiked) {
        UNLIKE_POST(post_uid, currentUserUid);
      } else {
        LIKE_POST(post_uid, currentUserUid);
      }
    } else {
      toggleModal(setShowLoginNeededPrompt);
    }
  };

  const saveUnsavePost = () => {
    if (currentUserUid) {
      if (haveISaved) {
        UNSAVE_POST(post_uid, currentUsername);
      } else {
        SAVE_POST(post_uid, currentUsername);
      }
    } else {
      toggleModal(setShowLoginNeededPrompt);
    }
  };

  const getLikers = () => {
    toggleModal(setShowLikersModal);
    if (!thisPostLikers) {
      GET_LIKERS(post_uid);
    }
  };

  const getComments = () => {
    if (!thisPostComments) {
      GET_COMMENTS(post_uid, currentUserUid);
    }
  };

  const deletePost = () => {
    toggleModal(setShowPostOptionsModal);
    DELETE_POST(post_uid);
    history.goBack();
  };

  const likeUnlikeComment = (likeOrUnlike, comment_uid) => {
    if (currentUserUid) {
      if (likeOrUnlike === "like") {
        LIKE_COMMENT(comment_uid, currentUserUid, post_uid);
      } else {
        UNLIKE_COMMENT(comment_uid, currentUserUid, post_uid);
      }
    } else {
      toggleModal(setShowLoginNeededPrompt);
    }
  };

  const deleteComment = (comment_uid) => {
    DELETE_COMMENT(comment_uid, post_uid);
  };

  const getCommentLikers = (comment_uid) => {
    GET_COMMENT_LIKERS(comment_uid, post_uid);
  };

  useEffect(() => {
    if (post_uid) {
      getComments();
    }
  }, [post_uid]);

  useEffect(() => {
    if (token) {
      if (currentUserUid && currentPost.length < 1) {
        LOAD_POST(post_id, currentUserUid);
      }
    } else {
      LOAD_POST(post_id, currentUserUid);
    }
  }, [token, currentUserUid, post_id]);

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
          <div className="post--card post--card-mobile">
            <div>
              <ul>
                <img
                  src={currentPost[0].poster_profileimage}
                  alt="post_user_image"
                />
                <Link to={`/${currentPost[0]?.poster_username}`}>
                  {currentPost[0]?.poster_username}
                </Link>
              </ul>

              <ul>
                <button onClick={() => toggleModal(setShowPostOptionsModal)}>
                  <BiDotsHorizontal />
                </button>
              </ul>
            </div>

            <div>
              <img src={currentPost[0]?.post_image} alt="post_main_img" />
            </div>

            <div>
              <div>
                <button onClick={likeUnlikePost}>
                  {haveILiked ? <Icons.LovedIcon /> : <Icons.LoveIcon />}
                </button>

                <button onClick={() => history.push(`/p/${post_id}`)}>
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
              <p>{currentPost[0]?.post_status}</p>
            </div>

            <div>
              <button onClick={getLikers}>
                {currentPost[0]?.post_likes_count || "No"}{" "}
                {currentPost[0]?.post_likes_count === 1 ? "like" : "likes"}
              </button>
              <button onClick={() => history.push(`/p/${post_id}`)}>
                {currentPost[0]?.post_comments_count}{" "}
                {currentPost[0]?.post_comments_count === 1
                  ? "comment"
                  : "comments"}
              </button>
            </div>

            <div>
              <p>{currentPost[0]?.post_posted_date}</p>
            </div>

            <CommentBox
              post_uid={post_uid}
              post_owner_uid={currentPost[0]?.poster_uid}
            />
          </div>

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

              <div className="comment--view-section">
                <CommentsView
                  comments={thisPostComments || []}
                  likeUnlikeComment={likeUnlikeComment}
                  currentUserUid={currentUserUid}
                  deleteComment={deleteComment}
                  currentUsername={currentUsername}
                  getCommentLikers={getCommentLikers}
                  gettingCommentLikers={gettingCommentLikers}
                />
              </div>

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
                    {currentPost[0]?.post_likes_count || "No"}{" "}
                    {currentPost[0]?.post_likes_count === 1 ? "like" : "likes"}
                  </button>
                </div>

                <div className="date">
                  <p>{currentPost[0]?.post_posted_date}</p>
                </div>

                <CommentBox
                  post_uid={post_uid}
                  post_owner_uid={currentPost[0]?.poster_uid}
                  toggleLoginNeededPrompt={() =>
                    toggleModal(setShowLoginNeededPrompt)
                  }
                />
              </div>
            </section>
          </div>
        </Fragment>
      )}

      {showLoginNeededPrompt ? (
        <Fragment>
          <LoginNeededPrompt
            toggle={() => toggleModal(setShowLoginNeededPrompt)}
          />
          <Backdrop
            show={showLoginNeededPrompt}
            toggle={() => toggleModal(setShowLoginNeededPrompt)}
          />
        </Fragment>
      ) : null}

      <div className="comment--view-section--mobile">
        <CommentsView
          comments={thisPostComments || []}
          likeUnlikeComment={likeUnlikeComment}
          currentUserUid={currentUserUid}
          deleteComment={deleteComment}
          currentUsername={currentUsername}
          getCommentLikers={getCommentLikers}
          gettingCommentLikers={gettingCommentLikers}
        />
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    userDataLoaded: state.user.user_data_loaded,
    gettingCommentLikers: state.posts.getting_comment_likers,
    loadingLikers: state.posts.loading_likers,
    currentUsername: state.user.currentUserData.username,
    currentUserUid: state.user.currentUserData.uid,
    posts: state.posts.posts,
    loading: state.posts.loading_post,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GET_COMMENT_LIKERS: (comment_uid, post_uid) =>
      dispatch(PostsActions.GET_COMMENT_LIKERS(comment_uid, post_uid)),
    DELETE_COMMENT: (comment_uid, post_uid) =>
      dispatch(PostsActions.DELETE_COMMENT(comment_uid, post_uid)),
    LIKE_COMMENT: (comment_uid, liker_uid, post_uid) =>
      dispatch(PostsActions.LIKE_COMMENT(comment_uid, liker_uid, post_uid)),
    UNLIKE_COMMENT: (comment_uid, unliker_uid, post_uid) =>
      dispatch(PostsActions.UNLIKE_COMMENT(comment_uid, unliker_uid, post_uid)),
    GET_COMMENTS: (post_uid, currentUserUid) =>
      dispatch(PostsActions.GET_COMMENTS(post_uid, currentUserUid)),
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
