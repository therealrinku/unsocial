import { Fragment, useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as postsActions from "../../redux/post/postsActions";
import UserListView from "../UserListView";
import Moment from "react-moment";
import { FiThumbsUp, FiThumbsDown, FiMessageSquare, FiMoreHorizontal } from "react-icons/fi";
import Backdrop from "../Backdrop";
import overflowToggler from "../../utilities/overflowToggler";
import PostOptionsModal from "../PostOptionsModal";
import placeholderImage from "../../assets/placeholder.jpg";
import lazyLoadImage from "../../utilities/lazyLoadImage.js";
import ProfilePicPlaceholder from "../../assets/avatar.jpg";
import styles from "./Post.module.scss";

type PostTypes = {
  post_commentsCount: number;
  post_image: string;
  post_likesCount: number;
  post_dislikesCount: number;
  post_postedDate: string;
  post_status: string;
  post_id: string;
  post_owner_uid: string;
  post_uid: string;
  poster_profileImage: string;
  poster_username: string;
  haveISaved: boolean;
  haveILiked: boolean;
  haveIDisliked: boolean;
  currentUsername: string;
  currentUserUid: string;
  currentUserProfileimage: string;
  LIKE_POST: any;
  UNLIKE_POST: any;
  DISLIKE_POST: any;
  UNDISLIKE_POST: any;
  UNSAVE_POST: any;
  SAVE_POST: any;
  GET_LIKERS: any;
  feedPosts: any;
  likersLoading: any;
  DELETE_POST: any;
  ADD_MESSAGE: any;
  toggleLoginPrompt?: any;
  fullHeightPostImage?: boolean;
};

function useOutsideAlerter(ref: any, toggle: any) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        toggle();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const Post = ({
  post_commentsCount,
  post_image,
  post_likesCount,
  post_dislikesCount,
  post_postedDate,
  post_status,
  post_id,
  post_owner_uid,
  post_uid,
  poster_profileImage,
  poster_username,
  haveISaved,
  haveILiked,
  haveIDisliked,
  currentUsername,
  currentUserUid,
  currentUserProfileimage,
  LIKE_POST,
  UNLIKE_POST,
  DISLIKE_POST,
  UNDISLIKE_POST,
  UNSAVE_POST,
  SAVE_POST,
  GET_LIKERS,
  feedPosts,
  likersLoading,
  DELETE_POST,
  ADD_MESSAGE,
  toggleLoginPrompt,
  fullHeightPostImage,
}: PostTypes) => {
  const thisPostLikers = feedPosts.filter((post: any) => post.post_uid === post_uid)[0]?.post_likers;
  const [showLikers, setShowLikers] = useState(false);
  const [showPostOptionsModal, setShowPostOptionsModal] = useState(false);

  const history = useHistory();

  const likeUnlikePost = () => {
    if (currentUsername) {
      if (haveILiked) {
        UNLIKE_POST(post_uid);
      } else {
        if (haveIDisliked) {
          UNDISLIKE_POST(post_uid);
        }
        LIKE_POST(post_uid, currentUserUid, post_owner_uid);
      }
    } else {
      toggleLoginPrompt();
    }
  };

  const dislikeUndislikePost = () => {
    if (currentUsername) {
      if (haveIDisliked) {
        UNDISLIKE_POST(post_uid);
      } else {
        if (haveILiked) {
          UNLIKE_POST(post_uid);
        }
        DISLIKE_POST(post_uid, currentUserUid, post_owner_uid);
      }
    } else {
      toggleLoginPrompt();
    }
  };

  /*const saveUnsavePost = () => {
    if (haveISaved) {
      UNSAVE_POST(post_uid, currentUsername);
    } else {
      SAVE_POST(post_uid, currentUsername);
    }
  };
  
  const getLikers = () => {
    toggleModal(setShowLikers);
    if (!thisPostLikers) {
      GET_LIKERS(post_uid);
    }
  };*/

  const toggleModal = (setShowModal: any) => {
    overflowToggler();
    setShowModal((prev: any) => !prev);
  };

  const deletePost = () => {
    DELETE_POST(post_uid);
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => setShowPostOptionsModal(false));

  return (
    <Fragment>
      <div className={styles.Post}>
        <section className={styles.TopSection}>
          <span>
            <img
              data-src={poster_profileImage}
              src={ProfilePicPlaceholder}
              className="lazy-image"
              onLoad={lazyLoadImage}
              alt="post_user_image"
            />
            <Link to={`/user/${poster_username}`}>{poster_username}</Link>
            &#183;
            <p>
              <Moment fromNow>{post_postedDate}</Moment>
            </p>
          </span>

          <div style={{ position: "relative" }} ref={wrapperRef}>
            <button onClick={() => setShowPostOptionsModal((prev) => !prev)} className={styles.OptionsButton}>
              <FiMoreHorizontal />
            </button>

            {showPostOptionsModal && (
              <Fragment>
                <PostOptionsModal
                  hideGoToPost={fullHeightPostImage}
                  toggle={() => setShowPostOptionsModal((prev) => !prev)}
                  isMyPost={poster_username === currentUsername}
                  deletePost={deletePost}
                  post_id={post_id}
                  AddMessage={ADD_MESSAGE}
                />
              </Fragment>
            )}
          </div>
        </section>

        <p className={styles.Status}>{post_status}</p>

        <section className={styles.ImageSection}>
          <Link to={`/p/${post_id}`}>
            <img
              className="lazy-image"
              src={placeholderImage}
              alt="post_main_img"
              data-src={post_image}
              onLoad={lazyLoadImage}
              style={fullHeightPostImage ? { height: "auto" } : undefined}
            />
          </Link>
        </section>

        <section className={styles.ActionButtons}>
          <button onClick={likeUnlikePost} style={haveILiked ? { color: "tomato" } : undefined}>
            <FiThumbsUp />
            <p>{typeof post_likesCount === "object" || post_likesCount === 0 ? "" : post_likesCount}</p>
          </button>

          <button onClick={dislikeUndislikePost} style={haveIDisliked ? { color: "tomato" } : undefined}>
            <FiThumbsDown />
            <p> {typeof post_dislikesCount === "object" || post_dislikesCount === 0 ? "" : post_dislikesCount}</p>
          </button>

          <button onClick={() => history.push(`/p/${post_id}`)}>
            <FiMessageSquare />
            <p> {typeof post_commentsCount === "object" || post_commentsCount === 0 ? "" : post_commentsCount}</p>
          </button>
        </section>

        {/*<p>{post_status}</p>
      

      <div>
        <button onClick={getLikers}>
          {post_likesCount || "No"} {post_likesCount === 1 ? "like" : "likes"}
        </button>
        <button onClick={() => history.push(`/p/${post_id}`)}>
          {post_commentsCount}{" "}
          {post_commentsCount === 1 ? "comment" : "comments"}
        </button>
      </div>

      <div>
       
      </div>
  */}
      </div>

      {showLikers && (
        <Fragment>
          <UserListView
            title="Likes"
            loading={likersLoading}
            users={thisPostLikers || []}
            toggle={() => toggleModal(setShowLikers)}
          />
          <Backdrop show={showLikers} toggle={() => toggleModal(setShowLikers)} />
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state: any) => {
  return {
    likersLoading: state.posts.loading_likers,
    feedPosts: state.posts.posts.filter((post: any) => post.infeed === true),
    currentUsername: state.user.currentUserData.username,
    currentUserUid: state.user.currentUserData.uid,
    currentUserProfileimage: state.user.currentUserData.profile_image_url,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    ADD_MESSAGE: (message: any) => dispatch(postsActions.ADD_MESSAGE(message)),
    DELETE_POST: (post_uid: any) => dispatch(postsActions.DELETE_POST(post_uid)),
    GET_LIKERS: (post_uid: any) => dispatch(postsActions.GET_LIKERS(post_uid)),
    SAVE_POST: (post_uid: any, saver_username: any) => dispatch(postsActions.SAVE_POST(post_uid, saver_username)),
    UNSAVE_POST: (post_uid: any, unsaver_username: any) =>
      dispatch(postsActions.UNSAVE_POST(post_uid, unsaver_username)),
    LIKE_POST: (post_uid: any, post_owner_uid: any) => dispatch(postsActions.LIKE_POST(post_uid, post_owner_uid)),
    UNLIKE_POST: (post_uid: any) => dispatch(postsActions.UNLIKE_POST(post_uid)),
    DISLIKE_POST: (post_uid: any, post_owner_uid: any) => dispatch(postsActions.DISLIKE_POST(post_uid, post_owner_uid)),
    UNDISLIKE_POST: (post_uid: any) => dispatch(postsActions.UNDISLIKE_POST(post_uid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
