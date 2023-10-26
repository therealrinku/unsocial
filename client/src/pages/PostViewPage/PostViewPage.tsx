import { Fragment, useEffect, useState } from "react";
import * as PostsActions from "../../redux/post/postsActions";
import { connect } from "react-redux";
import Loader from "../../components/Loader";
import overflowToggler from "../../utilities/overflowToggler";
import Backdrop from "../../components/Backdrop";
import CommentInput from "../../components/CommentInput";
import CommentsView from "../../components/CommentsView";
import { deleteComment, getCommentLikers } from "../../services/commentServices";
import LoginPrompt from "../../components/LoginPrompt";
import Post from "../../components/Post";
import TwoColumnLayout from "../../components/TwoColumnLayout";

type PostViewPageTypes = {
  currentUsername: string;
  currentUserUid: string;
  posts: any;
  match: any;
  history: any;
  LOAD_POST: any;
  loading: boolean;
  GET_COMMENTS: any;
  LIKE_COMMENT: any;
  UNLIKE_COMMENT: any;
  DELETE_COMMENT: any;
  GET_COMMENT_LIKERS: any;
  gettingCommentLikers: any;
  userDataLoaded: boolean;
  ADD_MESSAGE: any;
  token: string;
};

const PostViewPage = ({
  currentUsername,
  currentUserUid,
  posts,
  match,
  history,
  LOAD_POST,
  loading,
  GET_COMMENTS,
  LIKE_COMMENT,
  UNLIKE_COMMENT,
  DELETE_COMMENT,
  GET_COMMENT_LIKERS,
  gettingCommentLikers,
  userDataLoaded,
  ADD_MESSAGE,
  token,
}: PostViewPageTypes) => {
  const [showLoginNeededPrompt, setShowLoginNeededPrompt] = useState(false);
  const post_id = match.params.post_id;
  const currentPost = posts.filter((post: any) => post.post_id === post_id);
  const thisPostComments = currentPost[0]?.comments;
  const post_uid = currentPost[0]?.post_uid;

  const [postLoading, setPostLoading] = useState(true);

  useEffect(() => {
    if (!loading) setPostLoading(false);
  }, [loading]);

  const toggleModal = (setModal: any) => {
    setModal((prev: any) => !prev);
    overflowToggler();
  };

  const getComments = () => {
    if (!thisPostComments) {
      GET_COMMENTS(post_uid);
    }
  };

  const likeUnlikeComment = (likeOrUnlike: any, comment_uid: any) => {
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

  const deleteComment = (comment_uid: any) => {
    DELETE_COMMENT(comment_uid, post_uid);
  };

  const getCommentLikers = (comment_uid: any) => {
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
      {(loading || postLoading) && <Loader fullPage />}

      <TwoColumnLayout
        component1={() => (
          <Fragment>
            <Post
              key={currentPost[0]?.post_uid}
              post_id={currentPost[0]?.post_id}
              haveILiked={currentPost[0]?.liked_by_me}
              haveIDisliked={currentPost[0]?.disliked_by_me}
              post_uid={currentPost[0]?.post_uid}
              poster_username={currentPost[0]?.poster_username}
              poster_profileImage={currentPost[0]?.poster_profileimage}
              post_image={currentPost[0]?.post_image}
              post_postedDate={currentPost[0]?.post_posted_date}
              post_likesCount={currentPost[0]?.post_likes_count}
              post_dislikesCount={currentPost[0]?.post_dislikes_count}
              post_status={currentPost[0]?.post_status}
              post_owner_uid={currentPost[0]?.poster_uid}
              post_commentsCount={currentPost[0]?.post_comments_count}
              haveISaved={currentPost[0]?.i_have_saved}
              toggleLoginPrompt={() => toggleModal(setShowLoginNeededPrompt)}
              fullHeightPostImage
            />

            {post_uid && (
              <CommentInput
                post_uid={post_uid}
                post_owner_uid={currentPost[0]?.poster_uid}
                toggleLoginNeededPrompt={() => toggleModal(setShowLoginNeededPrompt)}
              />
            )}

            {thisPostComments !== undefined && (
              <CommentsView
                comments={thisPostComments || []}
                likeUnlikeComment={likeUnlikeComment}
                currentUserUid={currentUserUid}
                deleteComment={deleteComment}
                currentUsername={currentUsername}
                getCommentLikers={getCommentLikers}
                gettingCommentLikers={gettingCommentLikers}
              />
            )}
          </Fragment>
        )}
      />

      {showLoginNeededPrompt ? (
        <Fragment>
          <LoginPrompt toggle={() => toggleModal(setShowLoginNeededPrompt)} />
          <Backdrop show={showLoginNeededPrompt} toggle={() => toggleModal(setShowLoginNeededPrompt)} />
        </Fragment>
      ) : null}
    </Fragment>
  );
};

const mapStateToProps = (state: any) => {
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    ADD_MESSAGE: (message: any) => dispatch(PostsActions.ADD_MESSAGE(message)),
    GET_COMMENT_LIKERS: (comment_uid: any, post_uid: any) =>
      dispatch(PostsActions.GET_COMMENT_LIKERS(comment_uid, post_uid)),
    DELETE_COMMENT: (comment_uid: any, post_uid: any) => dispatch(PostsActions.DELETE_COMMENT(comment_uid, post_uid)),
    LIKE_COMMENT: (comment_uid: any, liker_uid: any, post_uid: any) =>
      dispatch(PostsActions.LIKE_COMMENT(comment_uid, liker_uid, post_uid)),
    UNLIKE_COMMENT: (comment_uid: any, unliker_uid: any, post_uid: any) =>
      dispatch(PostsActions.UNLIKE_COMMENT(comment_uid, unliker_uid, post_uid)),
    GET_COMMENTS: (post_uid: any) => dispatch(PostsActions.GET_COMMENTS(post_uid)),
    LOAD_POST: (post_id: any, current_user_uid: any) => dispatch(PostsActions.GET_POST(post_id, current_user_uid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostViewPage);
