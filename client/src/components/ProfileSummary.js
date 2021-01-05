import React from "react";
import { BiDotsHorizontal } from "react-icons/all";

const ProfileSummary = ({ profileData, isMyProfile }) => {
  return (
    <div className="profile_summary">
      <div className="left">
        <img src={profileData.profile_image_url} alt="profile_image" />
      </div>

      <div className="right">
        <div className="layer_one">
          <p className="username">{profileData.username}</p>
          <button
            className="profile_edit_button"
            style={!isMyProfile ? { display: "none" } : null}
          >
            Edit Profile
          </button>
        </div>

        <div className="layer_two"></div>

        <div className="layer_three">
          <p>I am a creator of instaclone app</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSummary;
