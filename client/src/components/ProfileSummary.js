import React, { Fragment } from "react";
import { BiDotsHorizontal, BiUserCheck } from "react-icons/all";

const ProfileSummary = ({
  profileData,
  isMyProfile,
  toggleProfileOptions,
  toggleUnfollowPrompt,
}) => {
  return (
    <Fragment>
      <div className="profile--summary-page">
        <section>
          <img src={profileData.profile_image_url} alt="profile_image" />
        </section>

        <section>
          <div>
            <p className="username">
              {profileData.username}dskksfkdkfdkfkdfkdfk
            </p>
            <button
              className="profile--edit-button"
              style={!isMyProfile ? { display: "none" } : null}
            >
              Edit Profile
            </button>
            <button
              className="unfollow--button"
              style={
                !isMyProfile && profileData.followed_by_me
                  ? null
                  : { display: "none" }
              }
              onClick={toggleUnfollowPrompt}
            >
              <BiUserCheck />
            </button>
            <button
              className="profile--options-button"
              onClick={toggleProfileOptions}
            >
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

      <div className="profile--summary-page-mobile">
        <section>
          <div>
            <img src={profileData.profile_image_url} alt="profile_image" />
          </div>

          <div>
            <div>
              <p className="username">
                {profileData.username}dskksfkdkfdkfkdfkdfk
              </p>
              <button
                className="profile--options-button"
                onClick={toggleProfileOptions}
              >
                <BiDotsHorizontal />
              </button>
            </div>

            <button
              className="profile--edit-button"
              style={!isMyProfile ? { display: "none" } : null}
            >
              Edit Profile
            </button>
            <button
              onClick={toggleUnfollowPrompt}
              className="unfollow--button"
              style={
                !isMyProfile && profileData.followed_by_me
                  ? null
                  : { display: "none" }
              }
            >
              <BiUserCheck />
            </button>
          </div>
        </section>

        <section>
          <p>I am a creator of instaclone app</p>
        </section>

        <section>
          <button>
            <b>{profileData.posts_count}</b>
            <p>posts</p>
          </button>
          <button>
            <b>{profileData.followers_count}</b>
            <p>followers</p>
          </button>
          <button>
            <b>{profileData.following_count}</b>
            <p>following</p>
          </button>
        </section>
      </div>
    </Fragment>
  );
};

export default ProfileSummary;
