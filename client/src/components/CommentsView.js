import Comment from "./Comment";

const CommentsView = ({
  comments,
  likeUnlikeComment,
  currentUserUid,
  deleteComment,
  currentUsername,
  getCommentLikers,
  gettingCommentLikers,
  mobile,
}) => {
  return (
    <div
      className="comments--view"
      style={mobile ? { overflow: "hidden", padding: 0 } : null}
    >
      {comments.map((comment) => {
        return (
          <Comment
            comments={comments}
            comment={comment}
            currentUserUid={currentUserUid}
            currentUsername={currentUsername}
            likeUnlikeComment={likeUnlikeComment}
            deleteComment={deleteComment}
            key={comment.comment_uid}
            gettingCommentLikers={gettingCommentLikers}
            getCommentLikers={getCommentLikers}
          />
        );
      })}
    </div>
  );
};

export default CommentsView;
