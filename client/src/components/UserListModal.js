import React from "react";
import { NavLink } from "react-router-dom";
import lazyLoadImage from "../utilities/lazyLoadImage";
import ProfilePicPlaceholder from "../assets/avatar.jpg";

const UserListModal = ({ title, loading, toggle, users }) => {
  return (
    <div className="view--users-modal">
      <p className="title">{title}</p>
      <section>
        {users.length > 0 ? (
          users.map((user) => {
            return (
              <div key={new Date() * Math.random()} className="user">
                <img
                  src={ProfilePicPlaceholder}
                  data-src={user.profile_image_url || ProfilePicPlaceholder}
                  alt="profile_img"
                  onLoad={lazyLoadImage}
                  className="user-image lazy-image"
                />
                <NavLink to={`/${user.username}`} onClick={toggle}>
                  {user.username}
                </NavLink>
              </div>
            );
          })
        ) : loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <p className="nothing-found">No any {title} atm.</p>
        )}
      </section>
    </div>
  );
};

export default UserListModal;
