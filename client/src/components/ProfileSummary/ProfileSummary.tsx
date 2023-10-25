import { Fragment } from "react";
import { AiOutlinePlusSquare, AiOutlinePoweroff, AiOutlineSetting } from "react-icons/all";
import { useHistory } from "react-router-dom";
import ProfilePicPlaceholder from "../../assets/avatar.jpg";
import lazyLoadImage from "../../utilities/lazyLoadImage";

type ProfileSummaryTypes = {
  profileData: any;
  isMyProfile: boolean;
  toggleUnfollowPrompt: any;
  showPostUploadModal: any;
  FOLLOW: any;
  LOAD_FOLLOWERS: any;
  LOAD_FOLLOWINGS: any;
  LOGOUT: () => void;
  currentUsername: string;
};

const ProfileSummary = ({
  profileData,
  isMyProfile,
  toggleUnfollowPrompt,
  showPostUploadModal,
  FOLLOW,
  LOAD_FOLLOWERS,
  LOAD_FOLLOWINGS,
  LOGOUT,
  currentUsername,
}: ProfileSummaryTypes) => {
  const history = useHistory();

  return (
    <Fragment>
      <div className="bg-white text-sm">
        <section className="px-5 py-4">
          <img
            src={ProfilePicPlaceholder}
            data-src={profileData.profile_image_url}
            alt="profile_image"
            onLoad={lazyLoadImage}
            className="lazy-image mb-4 h-36 w-36 object-cover"
          />

          <p className="text-lg font-bold">{profileData.username}</p>
          <p className="my-3">{profileData.bio}</p>

          <div className="flex items-center gap-1">
            <button>
              <b>{profileData.posts_count}</b> posts
            </button>
            &#183;
            <button onClick={LOAD_FOLLOWERS}>
              <b>{profileData.followers_count || 0}</b> {profileData.followers_count === 1 ? "follower" : "followers"}
            </button>
            &#183;
            <button onClick={LOAD_FOLLOWINGS}>
              <b>{profileData.following_count || 0}</b> following
            </button>
          </div>

          <br />

          <div className="flex items-center gap-4">
            {isMyProfile && (
              <button onClick={() => history.push("/settings")}>
                <AiOutlineSetting size={20} />
              </button>
            )}

            {!isMyProfile && !profileData.followed_by_me && (
              <button className="text-white px-5 py-1 bg-[#018e23]" onClick={FOLLOW}>
                Follow
              </button>
            )}

            {!isMyProfile && profileData.followed_by_me && (
              <button className="text-white px-5 py-1 bg-[#EE323D]" onClick={toggleUnfollowPrompt}>
                Unfollow
              </button>
            )}

            {isMyProfile && (
              <button onClick={showPostUploadModal}>
                <AiOutlinePlusSquare size={20} />
              </button>
            )}
            {isMyProfile && currentUsername && (
              <button onClick={LOGOUT}>
                <AiOutlinePoweroff size={20} />
              </button>
            )}
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default ProfileSummary;
