import { Link } from "react-router-dom";

const PostsGrid = ({ userPosts }) => {
  return (
    <div className="posts--grid">
      {userPosts
        .sort((a, b) => {
          return new Date(b.post_posted_date) - new Date(a.post_posted_date);
        })
        .map((e) => {
          return (
            <Link key={e.post_id} to={`/p/${e.post_id}`}>
              <img alt={e.status} src={e.post_image} />
            </Link>
          );
        })}
    </div>
  );
};

export default PostsGrid;
