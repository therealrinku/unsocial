import React, { Fragment } from "react";
import { FiMoreHorizontal, FiUserCheck, FiEdit, FiUserPlus } from "react-icons/all";
import { useHistory } from "react-router-dom";
import Linkify from "react-linkify";

const ProfileSummary = ({
  profileData,
  isMyProfile,
  toggleProfileOptions,
  toggleUnfollowPrompt,
  FOLLOW,
  LOAD_FOLLOWERS,
  LOAD_FOLLOWINGS,
}) => {
  const history = useHistory();

  return (
    <Fragment>
      <div className="profile--summary-page">
        <img src="https://bit.ly/3wo9Dvv" className="cover-image" alt="cover" />

        <section>
          <img src={profileData.profile_image_url} alt="profile_image" className="profile-image" />

          <p className="username">{profileData.username}</p>

          <p className="bio">
            <Linkify properties={{ target: "_blank" }}>{profileData.bio}</Linkify>
          </p>

          <div className="users-summary">
            <span>{profileData.posts_count} posts</span>
            <span style={{ marginLeft: "5px" }}>&middot;</span>
            <button onClick={LOAD_FOLLOWERS}>
              {profileData.followers_count || 0}
              {profileData.followers_count === 1 ? " follower" : " followers"}
            </button>
            <span style={{ marginLeft: "1px" }}>&middot;</span>
            <button onClick={LOAD_FOLLOWINGS}>{profileData.following_count || 0} following</button>
          </div>

          <div className="action-buttons">
            <button onClick={() => history.push("/edit/profile")} style={!isMyProfile ? { display: "none" } : null}>
              <FiEdit />
              <p>Edit Profile</p>
            </button>
            <button style={!isMyProfile && !profileData.followed_by_me ? null : { display: "none" }} onClick={FOLLOW}>
              <FiUserPlus />
              <p>Follow</p>
            </button>
            <button
              style={!isMyProfile && profileData.followed_by_me ? { border: "Solid 1px tomato" } : { display: "none" }}
              onClick={toggleUnfollowPrompt}
            >
              <FiUserCheck />
            </button>
            <button onClick={toggleProfileOptions}>
              <FiMoreHorizontal />
            </button>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default ProfileSummary;
