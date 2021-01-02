import React from "react";
import { VscClose } from "react-icons/vsc";
import { NavLink } from "react-router-dom";

const LikersModal = ({
  filteringUsername,
  pushingUserdata,
  loading,
  toggle,
  likers,
}) => {
  const myIndex = pushingUserdata
    ? likers.findIndex(
        (liker) => liker.username === pushingUserdata.currentUsername
      )
    : -1;
  const updatedLikersList =
    myIndex < 0 && pushingUserdata ? [...likers, pushingUserdata] : likers;
  const updatedFilteredLikersList = updatedLikersList.filter(
    (liker) => liker.username !== filteringUsername
  );

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
          {updatedFilteredLikersList.length > 0 ? (
            updatedFilteredLikersList.map((liker) => {
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
