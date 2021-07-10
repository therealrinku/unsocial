import React, { Fragment, useEffect, useState } from "react";
import * as PostsActions from "../redux/post/postsActions";
import { connect } from "react-redux";
import Loader from "../components/Loader";
import overflowToggler from "../utilities/overflowToggler";
import Backdrop from "../components/Backdrop";
import CommentBox from "../components/CommentBox";
import CommentsView from "../components/CommentsView";
import LoginNeededPrompt from "../components/LoginNeededPrompt";
import Post from "../components/Post";

const PostView = ({
  currentUsername,
  currentUserUid,
  posts,
  match,
  LOAD_POST,
  loading,
  loadingLikers,
  GET_COMMENTS,
  LIKE_COMMENT,
  UNLIKE_COMMENT,
  DELETE_COMMENT,
  GET_COMMENT_LIKERS,
  gettingCommentLikers,
  token,
}) => {
  //modal
  const [showLoginNeededPrompt, setShowLoginNeededPrompt] = useState(false);

  const toggleModal = (setModal) => {
    setModal((prev) => !prev);
    overflowToggler();
  };

  const post_id = match.params.post_id;
  const currentPost = posts.filter((post) => post.post_id === post_id);
  const thisPostComments = currentPost[0]?.comments;

  const post_uid = currentPost[0]?.post_uid;
  const haveILiked = currentPost[0]?.liked_by_me;
  const haveISaved = currentPost[0]?.i_have_saved;

  const getComments = () => {
    if (!thisPostComments) {
      GET_COMMENTS(post_uid, currentUserUid);
    }
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
    document.body.style.overflow = "auto";
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
      {loading ? (
        <Loader />
      ) : //checking if post exiists
      !loading && !currentPost[0]?.post_image ? (
        <p style={{ marginTop: "100px", textAlign: "center", fontSize: "15px" }}>
          Post deleted or something went wrong!
        </p>
      ) : (
        <Fragment>
          <Post
            post_commentsCount={currentPost[0].post_comments_count}
            post_image={currentPost[0]?.post_image}
            post_likesCount={currentPost[0]?.post_likes_count}
            post_postedDate={currentPost[0]?.post_posted_date}
            post_status={currentPost[0]?.post_status}
            post_id={post_id}
            post_owner_uid={currentPost[0]?.poster_uid}
            post_uid={post_uid}
            poster_profileImage={currentPost[0]?.poster_profileimage}
            poster_username={currentPost[0].poster_username}
            haveISaved={haveISaved}
            haveILiked={haveILiked}
            fullHeightImage={true}
          />

          <CommentBox post_uid={post_uid} post_owner_uid={currentPost[0]?.poster_uid} />

          <CommentsView
            mobile={true}
            comments={thisPostComments || []}
            likeUnlikeComment={likeUnlikeComment}
            currentUserUid={currentUserUid}
            deleteComment={deleteComment}
            currentUsername={currentUsername}
            getCommentLikers={getCommentLikers}
            gettingCommentLikers={gettingCommentLikers}
          />
        </Fragment>
      )}

      {showLoginNeededPrompt ? (
        <Fragment>
          <LoginNeededPrompt toggle={() => toggleModal(setShowLoginNeededPrompt)} />
          <Backdrop show={showLoginNeededPrompt} toggle={() => toggleModal(setShowLoginNeededPrompt)} />
        </Fragment>
      ) : null}
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
    GET_COMMENT_LIKERS: (comment_uid, post_uid) => dispatch(PostsActions.GET_COMMENT_LIKERS(comment_uid, post_uid)),
    DELETE_COMMENT: (comment_uid, post_uid) => dispatch(PostsActions.DELETE_COMMENT(comment_uid, post_uid)),
    LIKE_COMMENT: (comment_uid, liker_uid, post_uid) =>
      dispatch(PostsActions.LIKE_COMMENT(comment_uid, liker_uid, post_uid)),
    UNLIKE_COMMENT: (comment_uid, unliker_uid, post_uid) =>
      dispatch(PostsActions.UNLIKE_COMMENT(comment_uid, unliker_uid, post_uid)),
    GET_COMMENTS: (post_uid, currentUserUid) => dispatch(PostsActions.GET_COMMENTS(post_uid, currentUserUid)),
    LOAD_POST: (post_id, current_user_uid) => dispatch(PostsActions.GET_POST(post_id, current_user_uid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostView);
