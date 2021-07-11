import { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as postsActions from "../redux/post/postsActions";
import UserListModal from "./UserListModal";
import Backdrop from "./Backdrop";
import overflowToggler from "../utilities/overflowToggler";
import PostOptModal from "./PostOptModal";
import placeholderImage from "../assets/placeholder.jpg";
import lazyLoadImage from "../utilities/lazyLoadImage";
import ProfilePicPlaceholder from "../assets/avatar.jpg";
import LoginNeededPrompt from "./LoginNeededPrompt";
import { FiThumbsUp, FiThumbsDown, FiMessageCircle, FiSave, FiShare2, FiMoreHorizontal } from "react-icons/all";
import { Tooltip } from "@material-ui/core";
import moment from "moment";

const Post = ({
  post_commentsCount,
  post_image,
  post_likesCount,
  post_postedDate,
  post_status,
  post_id,
  post_owner_uid,
  post_uid,
  poster_profileImage,
  poster_username,
  haveISaved,
  haveILiked,
  currentUsername,
  currentUserUid,
  LIKE_POST,
  UNLIKE_POST,
  UNSAVE_POST,
  SAVE_POST,
  GET_LIKERS,
  feedPosts,
  likersLoading,
  DELETE_POST,
  ADD_MESSAGE,
  fullHeightImage,
}) => {
  const thisPostLikers = feedPosts.filter((post) => post.post_uid === post_uid)[0]?.post_likers;
  const [showLikers, setShowLikers] = useState(false);
  const [showPostOptionsModal, setShowPostOptionsModal] = useState(false);
  const [showLoginNeededPrompt, setShowLoginNeededPrompt] = useState(false);

  const history = useHistory();

  const likeUnlikePost = () => {
    if (currentUsername) {
      if (haveILiked) {
        UNLIKE_POST(post_uid, currentUserUid, post_owner_uid);
      } else {
        LIKE_POST(post_uid, currentUserUid, post_owner_uid);
      }
    } else {
      toggleModal(setShowLoginNeededPrompt);
    }
  };

  const saveUnsavePost = () => {
    if (currentUsername) {
      if (haveISaved) {
        UNSAVE_POST(post_uid, currentUsername);
      } else {
        SAVE_POST(post_uid, currentUsername);
      }
    } else {
      toggleModal(setShowLoginNeededPrompt);
    }
  };

  const toggleModal = (setShowModal) => {
    overflowToggler();
    setShowModal((prev) => !prev);
  };

  const getLikers = () => {
    toggleModal(setShowLikers);
    if (!thisPostLikers) {
      GET_LIKERS(post_uid);
    }
  };

  const showLikersModal = () => {
    toggleModal(setShowPostOptionsModal);
    getLikers();
  };

  const deletePost = () => {
    toggleModal(setShowPostOptionsModal);
    DELETE_POST(post_uid);
  };

  let differenceInDate;
  //formatted posted date
  const formattedPostedDate = moment(post_postedDate).format("dddd, MMMM Do YYYY, h:mm a");
  //finding difference of date
  const todaysDate = moment(new Date());
  const secondsDifference = moment(todaysDate).diff(moment(post_postedDate), "seconds");
  const minutesDifference = moment(todaysDate).diff(moment(post_postedDate), "minutes");
  const hoursDifference = moment(todaysDate).diff(moment(post_postedDate), "hours");
  const daysDifference = moment(todaysDate).diff(moment(post_postedDate), "days");
  const weeksDifference = moment(todaysDate).diff(moment(post_postedDate), "weeks");
  const monthsDifference = moment(todaysDate).diff(moment(post_postedDate), "months");
  const yearsDifference = moment(todaysDate).diff(moment(post_postedDate), "years");

  if (yearsDifference >= 1) {
    differenceInDate = yearsDifference + "y";
  }
  if (monthsDifference <= 11) {
    differenceInDate = monthsDifference + "mo";
  }
  if (weeksDifference <= 3) {
    differenceInDate = weeksDifference + "w";
  }
  if (daysDifference <= 7) {
    differenceInDate = daysDifference + "d";
  }
  if (hoursDifference <= 23) {
    differenceInDate = hoursDifference + "h";
  }
  if (minutesDifference <= 59 && minutesDifference >= 1) {
    differenceInDate = minutesDifference + "m";
  }
  if (secondsDifference <= 59) {
    differenceInDate = secondsDifference + "s";
  }

  return (
    <Fragment>
      <div className="post--card">
        <div className="top-div">
          <ul>
            <img
              data-src={poster_profileImage || ProfilePicPlaceholder}
              src={ProfilePicPlaceholder}
              className="lazy-image"
              onLoad={lazyLoadImage}
              alt="post_user_image"
            />
            <Link to={`/${poster_username}`}>{poster_username}</Link>
            <span style={{ marginLeft: "5px" }}>&middot;</span>
            <Tooltip title={<span style={{ fontSize: "13px" }}>{formattedPostedDate}</span>}>
              <p className="posted_date">{differenceInDate}</p>
            </Tooltip>
          </ul>

          <ul>
            <button onClick={() => toggleModal(setShowPostOptionsModal)}>
              <FiMoreHorizontal />
            </button>
          </ul>
        </div>

        <p className="status">{post_status}</p>

        <Link to={`/p/${post_id}`} className="image-div">
          <img
            style={fullHeightImage ? { height: "auto" } : null}
            className="lazy-image"
            src={placeholderImage}
            alt="post_main_img"
            data-src={post_image || placeholderImage}
            onLoad={lazyLoadImage}
          />
        </Link>

        <div className="actions-div">
          <Tooltip title={<span style={{ fontSize: "13px" }}>{haveILiked ? "Unlike" : "Like"}</span>}>
            <button onClick={likeUnlikePost} style={haveILiked ? { color: "#229954" } : null}>
              <FiThumbsUp />
              <p>{post_likesCount || ""}</p>
            </button>
          </Tooltip>

          {/*non functional atm*/}
          <Tooltip title={<span style={{ fontSize: "13px" }}>Dislike</span>}>
            <button>
              <FiThumbsDown />
              <p></p>
            </button>
          </Tooltip>

          <Tooltip title={<span style={{ fontSize: "13px" }}>Comment</span>}>
            <button onClick={() => history.push(`/p/${post_id}`)}>
              <FiMessageCircle />
              <p>{post_commentsCount || ""}</p>
            </button>
          </Tooltip>

          <Tooltip title={<span style={{ fontSize: "13px" }}>Share</span>}>
            <button>
              <FiShare2 />
            </button>
          </Tooltip>

          <Tooltip title={<span style={{ fontSize: "13px" }}>{haveISaved ? "Unsave" : "Save"}</span>}>
            <button onClick={saveUnsavePost} style={haveISaved ? { color: "#229954" } : null}>
              <FiSave />
            </button>
          </Tooltip>
        </div>
      </div>

      {showLikers ? (
        <Fragment>
          <UserListModal
            title="Likes"
            loading={likersLoading}
            users={thisPostLikers || []}
            toggle={() => toggleModal(setShowLikers)}
          />
          <Backdrop show={showLikers} toggle={() => toggleModal(setShowLikers)} />
        </Fragment>
      ) : null}

      {showLoginNeededPrompt ? (
        <Fragment>
          <LoginNeededPrompt toggle={() => toggleModal(setShowLoginNeededPrompt)} />
          <Backdrop show={showLoginNeededPrompt} toggle={() => toggleModal(setShowLoginNeededPrompt)} />
        </Fragment>
      ) : null}

      {showPostOptionsModal ? (
        <Fragment>
          <PostOptModal
            toggle={() => toggleModal(setShowPostOptionsModal)}
            isMyPost={poster_username === currentUsername}
            post_uid={post_uid}
            deletePost={deletePost}
            post_id={post_id}
            AddMessage={ADD_MESSAGE}
            showLikers={showLikersModal}
          />
          <Backdrop show={showPostOptionsModal} toggle={() => toggleModal(setShowPostOptionsModal)} />
        </Fragment>
      ) : null}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    likersLoading: state.posts.loading_likers,
    feedPosts: state.posts.posts.filter((post) => post.infeed === true),
    currentUsername: state.user.currentUserData.username,
    currentUserUid: state.user.currentUserData.uid,
    currentUserProfileimage: state.user.currentUserData.profile_image_url,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ADD_MESSAGE: (message) => dispatch(postsActions.ADD_MESSAGE(message)),
    DELETE_POST: (post_uid) => dispatch(postsActions.DELETE_POST(post_uid)),
    GET_LIKERS: (post_uid) => dispatch(postsActions.GET_LIKERS(post_uid)),
    SAVE_POST: (post_uid, saver_username) => dispatch(postsActions.SAVE_POST(post_uid, saver_username)),
    UNSAVE_POST: (post_uid, unsaver_username) => dispatch(postsActions.UNSAVE_POST(post_uid, unsaver_username)),
    LIKE_POST: (post_uid, liker_uid, post_owner_uid) =>
      dispatch(postsActions.LIKE_POST(post_uid, liker_uid, post_owner_uid)),
    UNLIKE_POST: (post_uid, unliker_uid) => dispatch(postsActions.UNLIKE_POST(post_uid, unliker_uid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
