const PostsGrid = ({ userPosts }) => {
  return (
    <div className="posts--grid">
      {userPosts
        .sort((a, b) => {
          return new Date(b.posted_date) - new Date(a.posted_date);
        })
        .map((e) => {
          return (
            <div key={e.post_id}>
              <img src={e.post_image} alt={e.status || "post"} />
            </div>
          );
        })}
    </div>
  );
};

export default PostsGrid;
