import React from "react";
import { BiDotsHorizontal } from "react-icons/all";

const ProfileSummary = ({ profileData, isMyProfile }) => {
  return (
    <div className="profile--summary-page">
      <section>
        <img src={profileData.profile_image_url} alt="profile_image" />
      </section>

      <section>
        <div>
          <p className="username">{profileData.username}</p>
          <button className="profile--edit-button">Edit Profile</button>
          <button className="profile--options-button">
            <BiDotsHorizontal />
          </button>
        </div>

        <div>
          <button>
            <b>{profileData.posts_count}</b> posts
          </button>
          <button>
            <b>{profileData.followers_count}</b> followers
          </button>
          <button>
            <b>{profileData.following_count}</b> following
          </button>
        </div>

        <div>
          <p>I am a creator of instaclone app</p>
        </div>
      </section>
    </div>
  );
};

export default ProfileSummary;
