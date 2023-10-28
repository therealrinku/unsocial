import { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import overflowToggler from "../../utilities/overflowToggler";
import UserListView from "./../UserListView";
import lazyLoadImage from "../../utilities/lazyLoadImage.js";
import ProfilePicPlaceholder from "../../assets/avatar.jpg";
import Moment from "react-moment";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

type CommentTypes = {
  comments: any;
  comment: any;
  likeUnlikeComment: any;
  currentUserUid: string;
  currentUsername: string;
  deleteComment: any;
  getCommentLikers: any;
  gettingCommentLikers: boolean;
};

const Comment = ({
  comments,
  comment,
  likeUnlikeComment,
  currentUserUid,
  currentUsername,
  deleteComment,
  getCommentLikers,
  gettingCommentLikers,
}: CommentTypes) => {
  const [showCommentLikers, setShowCommentLikers] = useState(false);
  const commentLikers = comments.filter((cmt: any) => cmt.comment_uid === comment.comment_uid)[0]?.likers;

  const toggleModal = (setModal: any) => {
    setModal((prev: any) => !prev);
    overflowToggler();
  };

  const loadCommentLikers = () => {
    toggleModal(setShowCommentLikers);
    if (!commentLikers) {
      getCommentLikers(comment.comment_uid);
    }
  };

  return (
    <Fragment>
      <div className="flex items-start text-sm my-5">
        <img
          data-src={comment.poster_profile_image}
          src={ProfilePicPlaceholder}
          className="lazy-image h-7 w-7 rounded-full object-cover"
          onLoad={lazyLoadImage}
          alt="profile-image"
        />

        <div className="flex flex-col items-start ml-2 gap-1">
          <div className="flex items-center">
            <p className="font-bold hover:underline">
              <NavLink to={`/user/${comment.poster_username}`}>{comment.poster_username}</NavLink>
            </p>
            <p className="ml-2 break-all">{comment.comment}</p>
          </div>

          <div className="flex gap-1">
            <p>
              <Moment fromNow>{comment.posted_date}</Moment>
            </p>
            <span>&#183;</span>
            <button
              className="flex items-center gap-1"
              onClick={() => likeUnlikeComment(comment.liked_by_me ? "unlike" : "like", comment.comment_uid)}
            >
              {comment.liked_by_me ? <AiFillHeart color="#EE323D" size={15} /> : <AiOutlineHeart size={15} />}
              {comment.comment_likes_count || 0}
            </button>

            {(currentUserUid === comment.post_owner_uid || currentUsername === comment.poster_username) && (
              <>
                <span>&#183;</span>

                <button className="hover:text-[#EE323D]" onClick={() => deleteComment(comment.comment_uid)}>
                  delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {showCommentLikers ? (
        <Fragment>
          <UserListView
            title="Likes"
            loading={gettingCommentLikers}
            toggle={() => toggleModal(setShowCommentLikers)}
            users={commentLikers || []}
          />
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default Comment;
