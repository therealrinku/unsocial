import { Tooltip } from "@material-ui/core";
import { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import overflowToggler from "../utilities/overflowToggler";
import Backdrop from "./Backdrop";
import UserListModal from "./UserListModal";
import moment from "moment";

const Comment = ({
  comments,
  comment,
  likeUnlikeComment,
  currentUserUid,
  currentUsername,
  deleteComment,
  getCommentLikers,
  gettingCommentLikers,
}) => {
  const [showCommentLikers, setShowCommentLikers] = useState(false);
  const commentLikers = comments.filter((cmt) => cmt.comment_uid === comment.comment_uid)[0]?.likers;

  const toggleModal = (setModal) => {
    setModal((prev) => !prev);
    overflowToggler();
  };

  const loadCommentLikers = () => {
    toggleModal(setShowCommentLikers);
    if (!commentLikers) {
      getCommentLikers(comment.comment_uid);
    }
  };

  let differenceInDate;
  //formatted posted date
  const formattedPostedDate = moment(comment.posted_date).format("dddd, MMMM Do YYYY, h:mm a");
  //finding difference of date
  const todaysDate = moment(new Date());
  const secondsDifference = moment(todaysDate).diff(moment(comment.posted_date), "seconds");
  const minutesDifference = moment(todaysDate).diff(moment(comment.posted_date), "minutes");
  const hoursDifference = moment(todaysDate).diff(moment(comment.posted_date), "hours");
  const daysDifference = moment(todaysDate).diff(moment(comment.posted_date), "days");
  const weeksDifference = moment(todaysDate).diff(moment(comment.posted_date), "weeks");
  const monthsDifference = moment(todaysDate).diff(moment(comment.posted_date), "months");
  const yearsDifference = moment(todaysDate).diff(moment(comment.posted_date), "years");

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
      <div className="comment">
        <img src={comment.poster_profile_image} alt="profile-image" />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <p className="username--comment">
              <NavLink to={`/${comment.poster_username}`}>{comment.poster_username}</NavLink> {comment.comment}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "-15px",
            }}
          >
            <Tooltip title={<span style={{ fontSize: "13px" }}>{formattedPostedDate}</span>}>
              <p className="date">{differenceInDate}</p>
            </Tooltip>
            <button onClick={loadCommentLikers}>
              {comment.comment_likes_count || 0} {comment.comment_likes_count === 1 ? "like" : "likes"}
            </button>
            <button onClick={() => likeUnlikeComment(comment.liked_by_me ? "unlike" : "like", comment.comment_uid)}>
              {comment.liked_by_me ? "unlike" : "like"}
            </button>
            <button
              style={
                currentUserUid === comment.post_owner_uid || currentUsername === comment.poster_username
                  ? { color: "red" }
                  : { display: "none" }
              }
              onClick={() => deleteComment(comment.comment_uid)}
            >
              delete
            </button>
          </div>
        </div>
      </div>

      {showCommentLikers ? (
        <Fragment>
          <UserListModal
            title="Likes"
            loading={gettingCommentLikers}
            toggle={() => toggleModal(setShowCommentLikers)}
            users={commentLikers || []}
          />
          <Backdrop show={showCommentLikers} toggle={() => toggleModal(setShowCommentLikers)} />
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default Comment;
