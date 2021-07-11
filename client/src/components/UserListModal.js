import React from "react";
import { NavLink } from "react-router-dom";

const UserListModal = ({ title, loading, toggle, users }) => {
  return (
    <div className="view--users-modal">
      <p className="title">{title}</p>
      <section>
        {users.length > 0 ? (
          users.map((user) => {
            return (
              <div key={new Date() * Math.random()} className="user">
                <img src={user.profile_image_url} alt="profile_img" className="user-image" />
                <NavLink to={`/user/${user.username}`} onClick={toggle}>
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
