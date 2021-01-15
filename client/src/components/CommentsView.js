import React from "react";

const CommentsView = ({ comments }) => {
  return (
    <div className="comments--view">
      {comments.map((comment) => {
        return (
          <div key={comment.comment_uid}>
            <section>
              <img src={comment.poster_profile_image} alt="profile-image" />
              <p>{comment.poster_username}</p>
              <p>{comment.comment}</p>
            </section>

            <section>
              <p>{comment.posted_date}</p>
              <p>{comment.comment_likes_count || 0} likes</p>
            </section>
          </div>
        );
      })}
    </div>
  );
};

export default CommentsView;
