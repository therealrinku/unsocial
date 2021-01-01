import React from "react";
import { VscClose } from "react-icons/vsc";
import { NavLink } from "react-router-dom";

const LikersModal = ({ loading, toggle, likers }) => {
  return (
    <div className="view--likers-modal">
      <div>
        <p>Likes</p>
        <button onClick={toggle}>
          <VscClose />
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", fontSize: "14px" }}>Loading....</div>
      ) : (
        <div>
          {likers.length > 0 ? (
            likers.map((liker) => {
              return (
                <div key={new Date() * Math.random()}>
                  <img src={liker.profile_image_url} alt="profile_img" />
                  <NavLink to={`/${liker.username}`} onClick={toggle}>
                    {liker.username}
                  </NavLink>
                </div>
              );
            })
          ) : (
            <p>No any likes atm.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LikersModal;
