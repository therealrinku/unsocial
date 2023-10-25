import Comment from "../Comment";

type CommentsViewTypes = {
  comments: any;
  likeUnlikeComment: any;
  currentUserUid: string;
  deleteComment: any;
  currentUsername: string;
  getCommentLikers: any;
  gettingCommentLikers: boolean;
};

const CommentsView = ({
  comments,
  likeUnlikeComment,
  currentUserUid,
  deleteComment,
  currentUsername,
  getCommentLikers,
  gettingCommentLikers,
}: CommentsViewTypes) => {
  return (
    <>
      {comments.length > 0 && (
        <div className="bg-white p-3 mt-[-15px] border border-t-0">
          {comments.map((comment: any) => {
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
      )}
    </>
  );
};

export default CommentsView;
