import Comment from "../Comment";
import styles from "./CommentsView.module.scss";

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
    <div className={styles.CommentView}>
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
  );
};

export default CommentsView;
