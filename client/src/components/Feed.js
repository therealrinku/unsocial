import Post from "./Post";

const Feed = ({ feed }) => {
  return (
    <div style={{marginBottom:"40px"}}>
      {feed
        .sort((a, b) => {
          return new Date(b.post_posted_date) - new Date(a.post_posted_date);
        })
        .map((post) => {
          return (
            <Post
              key={post.post_uid}
              post_id={post.post_id}
              haveILiked={post.liked_by_me}
              post_uid={post.post_uid}
              poster_username={post.poster_username}
              poster_profileImage={post.poster_profileimage}
              post_image={post.post_image}
              post_postedDate={post.post_posted_date}
              post_likesCount={post.post_likes_count}
              post_status={post.post_status}
              post_owner_uid={post.poster_uid}
              post_commentsCount={post.post_comments_count}
              haveISaved={post.i_have_saved}
            />
          );
        })}
    </div>
  );
};

export default Feed;
