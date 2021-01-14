import { NavLink } from "react-router-dom";

const Recommended = ({ recommendedUsers }) => {
  return (
    <div className="recommended">
      <p>People you may like to follow</p>
      {recommendedUsers.map((user) => {
        return (
          <div className="recommended--user" key={user.username}>
            <img src={user.profile_image_url} alt="profile_img" />
            <NavLink to={`/${user.username}`}>{user.username}</NavLink>
          </div>
        );
      })}
    </div>
  );
};

export default Recommended;
