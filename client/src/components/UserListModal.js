import React from "react";
import { VscClose } from "react-icons/vsc";
import { NavLink } from "react-router-dom";

const UserListModal = ({ title, loading, toggle, users }) => {
  return (
    <div className="view--users-modal">
      <div>
        <p>{title}</p>
        <button onClick={toggle}>
          <VscClose />
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", fontSize: "14px" }}>Loading....</div>
      ) : (
        <div>
          {users.length > 0 ? (
            users.map((user) => {
              return (
                <div key={new Date() * Math.random()}>
                  <img src={user.profile_image_url} alt="profile_img" />
                  <NavLink to={`/${user.username}`} onClick={toggle}>
                    {user.username}
                  </NavLink>
                </div>
              );
            })
          ) : (
            <p>No any {title} atm.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserListModal;
