import { useState } from "react";

const CommentBox = () => {
  const [comment, setComment] = useState("");
  return (
    <div className="comment--box">
      <form>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add comment.."
        />
        <button disabled={comment.trim().length <= 3}>Post</button>
      </form>
    </div>
  );
};

export default CommentBox;
