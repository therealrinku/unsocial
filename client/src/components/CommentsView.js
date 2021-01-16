import Comment from "./Comment";

const CommentsView = ({
  comments,
  likeUnlikeComment,
  currentUserUid,
  deleteComment,
  currentUsername,
  getCommentLikers,
  gettingCommentLikers,
}) => {
  return (
    <div className="comments--view">
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
