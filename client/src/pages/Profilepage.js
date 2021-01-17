import React, { Fragment, useEffect, useState } from "react";
import ProfileSummary from "../components/ProfileSummary";
import Navbar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";
import * as profileActions from "../redux/profile/ProfileActions";
import { connect } from "react-redux";
import overflowToggler from "../utilities/overflowToggler";
import ProfileOptModal from "../components/ProfileOptModal";
import Backdrop from "../components/Backdrop";
import UnfollowPrompt from "../components/UnfollowPrompt";
import ProfileButtonLine from "../components/ProfileButtonLine";
import PostsGrid from "../components/PostsGrid";
import UserListModal from "../components/UserListModal";
import Loader from "../components/Loader";
import * as userActions from "../redux/user/userActions";

const Profilepage = ({
  history,
  currentUserUid,
  profiles,
  GET_PROFILE_DATA,
  currentUsername,
  FOLLOW,
  UNFOLLOW,
  FETCH_FOLLOWERS,
  FETCH_FOLLOWINGS,
  loading,
  loading_followers_or_following,
  LOGOUT,
}) => {
  const profileUsername = history.location.pathname.slice(1);
  const profileData = profiles.filter(
    (profile) => profile?.username === profileUsername
  );

  //modal handlers
  const [showProfileOptionsModal, setShowProfileOptionsModal] = useState(false);
  const [showUnfollowPrompt, setShowUnfollowPrompt] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowings, setShowFollowings] = useState(false);

  //
  const [showSavedPosts, setShowSavedPosts] = useState(false);

  //followers and following list
  const followersList = profiles.filter(
    (profile) => profile.username === profileUsername
  )[0]?.followers;
  const followingList = profiles.filter(
    (profile) => profile.username === profileUsername
  )[0]?.followings;

  const LOAD_FOLLOWERS = () => {
    if (!followersList) {
      FETCH_FOLLOWERS(profileUsername);
    }
    toggleModal(setShowFollowers);
  };

  const LOAD_FOLLOWINGS = () => {
    if (!followingList) {
      FETCH_FOLLOWINGS(profileUsername);
    }
    toggleModal(setShowFollowings);
  };

  const toggleModal = (setModal) => {
    setModal((prev) => !prev);
    overflowToggler();
  };

  const Logout = () => {
    toggleModal(setShowProfileOptionsModal);
    LOGOUT();
    history.push("/");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    //set document title
    document.title = `${profileUsername} at Instaclone`;
    if (profileData.length <= 0) {
      GET_PROFILE_DATA(profileUsername, currentUserUid);
    }

    return () => {
      document.title = "Instaclone";
    };
  }, [profileUsername, currentUserUid]);

  return (
    <Fragment>
      <Navbar />
      {loading ? (
        <Loader />
      ) : !loading && profileData.length < 1 ? (
        <p
          style={{ marginTop: "100px", textAlign: "center", fontSize: "15px" }}
        >
          This link is broken
        </p>
      ) : (
        <div className="profile--page">
          <ProfileSummary
            profileData={profileData[0] || []}
            toggleProfileOptions={() => toggleModal(setShowProfileOptionsModal)}
            toggleUnfollowPrompt={() => toggleModal(setShowUnfollowPrompt)}
            isMyProfile={currentUsername === profileUsername}
            FOLLOW={() => FOLLOW(profileData[0]?.uid, currentUserUid)}
            LOAD_FOLLOWERS={LOAD_FOLLOWERS}
            LOAD_FOLLOWINGS={LOAD_FOLLOWINGS}
          />
          <ProfileButtonLine
            showSavedPosts={showSavedPosts}
            isMyProfile={currentUsername === profileUsername}
            viewSavedPosts={() => setShowSavedPosts(true)}
            hideSavedPosts={() => setShowSavedPosts(false)}
            no_posts={profileData[0]?.posts.length <= 0}
          />
          <PostsGrid
            userPosts={
              showSavedPosts
                ? profileData[0]?.savedPosts
                : profileData[0]?.posts || []
            }
          />
          <MobileNavbar />
          {showProfileOptionsModal ? (
            <Fragment>
              <ProfileOptModal
                toggle={() => toggleModal(setShowProfileOptionsModal)}
                isMyProfile={currentUsername === profileUsername}
                LOGOUT={Logout}
              />
              <Backdrop
                show={showProfileOptionsModal}
                toggle={() => toggleModal(setShowProfileOptionsModal)}
              />
            </Fragment>
          ) : null}

          {showUnfollowPrompt ? (
            <Fragment>
              <Backdrop
                show={showUnfollowPrompt}
                toggle={() => toggleModal(setShowUnfollowPrompt)}
              />
              <UnfollowPrompt
                profileUsername={profileUsername}
                profileImage={profileData[0]?.profile_image_url}
                toggle={() => toggleModal(setShowUnfollowPrompt)}
                UNFOLLOW={() => UNFOLLOW(profileData[0].uid, currentUserUid)}
              />
            </Fragment>
          ) : null}

          {showFollowers || showFollowings ? (
            <Fragment>
              <Backdrop
                toggle={() =>
                  showFollowers
                    ? toggleModal(setShowFollowers)
                    : toggleModal(setShowFollowings)
                }
                show={showFollowers || showFollowings}
              />
              <UserListModal
                title={showFollowers ? "Followers" : "Following"}
                loading={loading_followers_or_following}
                users={(showFollowers ? followersList : followingList) || []}
                toggle={() =>
                  showFollowers
                    ? toggleModal(setShowFollowers)
                    : toggleModal(setShowFollowings)
                }
              />
            </Fragment>
          ) : null}
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.profile.loading,
    currentUsername: state.user.currentUserData.username,
    currentUserUid: state.user.currentUserData.uid,
    profiles: state.profile.profiles,
    loading: state.profile.loading,
    loading_followers_or_following:
      state.profile.loading_followers_or_following,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    LOGOUT: () => dispatch(userActions.LOGOUT()),
    FETCH_FOLLOWERS: (username) =>
      dispatch(profileActions.FETCH_FOLLOWERS(username)),
    FETCH_FOLLOWINGS: (username) =>
      dispatch(profileActions.FETCH_FOLLOWINGS(username)),
    UNFOLLOW: (unfollowing_user_uid, unfollower_user_uid) =>
      dispatch(
        profileActions.UNFOLLOW(unfollowing_user_uid, unfollower_user_uid)
      ),
    FOLLOW: (following_user_uid, follower_user_uid) =>
      dispatch(profileActions.FOLLOW(following_user_uid, follower_user_uid)),
    GET_PROFILE_DATA: (profile_username, current_user_uid) =>
      dispatch(
        profileActions.GET_PROFILE_DATA(profile_username, current_user_uid)
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profilepage);
