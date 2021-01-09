import { useHistory } from "react-router-dom";

const PostsGrid = ({ userPosts }) => {
  const history = useHistory();

  return (
    <div className="posts--grid">
      {userPosts
        .sort((a, b) => {
          return new Date(b.posted_date) - new Date(a.posted_date);
        })
        .map((e) => {
          return (
            <div key={e.post_id}>
              <img
                src={e.post_image}
                alt={e.status || "post"}
                onClick={() => history.push(`/p/${e.post_id}`)}
              />
            </div>
          );
        })}
    </div>
  );
};

export default PostsGrid;
