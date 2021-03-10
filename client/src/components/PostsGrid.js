import { useHistory } from "react-router-dom";
import placeholderImage from "../assets/placeholder.jpg";
import lazyLoadImage from "../utilities/lazyLoadImage.js";

const PostsGrid = ({ userPosts }) => {
  const history = useHistory();

  return (
    <div className="posts--grid">
      {userPosts
        .sort((a, b) => {
          return new Date(b.post_posted_date) - new Date(a.post_posted_date);
        })
        .map((e) => {
          return (
            <div key={e.post_id}>
              <img
                onLoad={lazyLoadImage}
                className="lazy-image"
                src={placeholderImage}
                alt={e.status || "post"}
                data-src={e.post_image}
                onClick={() => history.push(`/p/${e.post_id}`)}
              />
            </div>
          );
        })}
    </div>
  );
};

export default PostsGrid;
