import React from "react";

const CommentsView = ({ comments }) => {
  return (
    <div className="comments--view">
      {comments.map((comment) => {
        return (
          <div key={comment.comment_uid} className="comment">
            <section>
              <img src={comment.poster_profile_image} alt="profile-image" />
              <p className="username">{comment.poster_username}</p>
            </section>

            <section>
              <p className="comment_">{comment.comment}</p>

              <div>
                <p>1h</p>
                <button>{comment.comment_likes_count || 0} likes</button>
                <button>like</button>
              </div>
            </section>
          </div>
        );
      })}
    </div>
  );
};

export default CommentsView;
