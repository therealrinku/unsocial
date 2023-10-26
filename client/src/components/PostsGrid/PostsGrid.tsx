import { Link } from "react-router-dom";
import placeholderImage from "../../assets/placeholder.jpg";
import lazyLoadImage from "../../utilities/lazyLoadImage.js";
import styles from "./PostsGrid.module.scss";

type PostsGridTypes = {
  userPosts: any;
};

const PostsGrid = ({ userPosts }: PostsGridTypes) => {
  return (
    <div className={`${styles["Posts-Grid"]} border`}>
      {userPosts
        .sort((a: any, b: any) => {
          return (
            new Date(b.post_posted_date).valueOf() -
            new Date(a.post_posted_date).valueOf()
          );
        })
        .map((e: any) => {
          return (
            <div key={e.post_id}>
              <Link to={`/p/${e.post_id}`}>
                <img
                  onLoad={lazyLoadImage}
                  className="lazy-image"
                  src={placeholderImage}
                  alt={e.status || "post"}
                  data-src={e.post_image}
                />
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default PostsGrid;
