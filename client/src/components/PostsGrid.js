import { useHistory } from "react-router-dom";

const PostsGrid = ({ userPosts }) => {
  const history = useHistory();

  const loadImage = () => {
    const gridImages = document.querySelectorAll(".grid-image");
    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const image = entry.target;
        const newSrc = image.getAttribute("data-src");
        image.src = newSrc;
      });
    }, {});

    gridImages.forEach((image) => {
      observer.observe(image);
    });
  };

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
                onLoad={loadImage}
                className="grid-image"
                src="https://bit.ly/30mn9T0"
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
