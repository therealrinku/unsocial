import { Fragment, useEffect, useState } from "react";
import ProfileSummary from "../../components/ProfileSummary";
import * as profileActions from "../../redux/profile/ProfileActions";
import { connect } from "react-redux";
import overflowToggler from "../../utilities/overflowToggler";
import Backdrop from "../../components/Backdrop";
import UnfollowPrompt from "../../components/UnfollowPrompt";
import PostsGrid from "../../components/PostsGrid";
import UserListView from "../../components/UserListView";
import Loader from "../../components/Loader";
import LoginPrompt from "../../components/LoginPrompt";
import PostUploadView from "../../components/PostUploadView";
import styles from "./ProfilePage.module.scss";

type ProfilePageTypes = {
  history: any;
  currentUserUid: string;
  profiles: Array<any>;
  GET_PROFILE_DATA: Function;
  currentUsername: string;
  FOLLOW: Function;
  UNFOLLOW: Function;
  FETCH_FOLLOWERS: Function;
  FETCH_FOLLOWINGS: Function;
  loading: boolean;
  loading_followers_or_following: boolean;
  LOGOUT: Function;
};

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
}: ProfilePageTypes) => {
  const profileUsername = history.location.pathname.slice(6);
  const profileData = profiles.filter((profile) => profile?.username === profileUsername);

  //modal handlers
  const [showUnfollowPrompt, setShowUnfollowPrompt] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowings, setShowFollowings] = useState(false);
  const [showLoginNeededPrompt, setShowLoginNeededPrompt] = useState(false);
  const [showPostUploadModal, setShowPostUploadModal] = useState(false);

  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    if (!loading) setProfileLoading(false);
  }, [loading]);

  //followers and following list
  const followersList = profiles.filter((profile) => profile.username === profileUsername)[0]?.followers;
  const followingList = profiles.filter((profile) => profile.username === profileUsername)[0]?.followings;

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

  const toggleModal = (setModal: Function) => {
    setModal((prev: any) => !prev);
    overflowToggler();
  };

  const follow = () => {
    if (currentUserUid) {
      FOLLOW(profileData[0]?.uid, currentUserUid);
    } else {
      toggleModal(setShowLoginNeededPrompt);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "auto";
    //set document title
    document.title = `${profileUsername}`;
    if (profileData.length <= 0) {
      GET_PROFILE_DATA(profileUsername, currentUserUid);
    }

    return () => {
      document.title = "robosocial";
    };
  }, [profileUsername, currentUserUid]);

  return (
    <Fragment>
      {loading || profileLoading ? (
        <Loader fullPage />
      ) : !loading && profileData.length < 1 ? (
        <p style={{ marginTop: "100px", textAlign: "center", fontSize: "15px" }}>This link is broken</p>
      ) : (
        <div className={styles.ProfilePage}>
          <ProfileSummary
            showPostUploadModal={() => toggleModal(setShowPostUploadModal)}
            profileData={profileData[0] || []}
            toggleUnfollowPrompt={() => toggleModal(setShowUnfollowPrompt)}
            isMyProfile={currentUsername === profileUsername}
            FOLLOW={follow}
            LOAD_FOLLOWERS={LOAD_FOLLOWERS}
            LOAD_FOLLOWINGS={LOAD_FOLLOWINGS}
          />

          {profileData[0].posts.length > 0 && (
            <section className={styles.PostsGrid}>
              <PostsGrid userPosts={profileData[0]?.posts || []} />
            </section>
          )}

          {showUnfollowPrompt && (
            <Fragment>
              <Backdrop show={showUnfollowPrompt} toggle={() => toggleModal(setShowUnfollowPrompt)} />
              <UnfollowPrompt
                profileUsername={profileUsername}
                profileImage={profileData[0]?.profile_image_url}
                toggle={() => toggleModal(setShowUnfollowPrompt)}
                UNFOLLOW={() => UNFOLLOW(profileData[0].uid, currentUserUid)}
              />
            </Fragment>
          )}

          {showPostUploadModal && (
            <Fragment>
              <Backdrop show={showPostUploadModal} toggle={() => toggleModal(setShowPostUploadModal)} />
              <PostUploadView toggle={() => toggleModal(setShowPostUploadModal)} />
            </Fragment>
          )}

          {(showFollowers || showFollowings) && (
            <Fragment>
              <Backdrop
                toggle={() => (showFollowers ? toggleModal(setShowFollowers) : toggleModal(setShowFollowings))}
                show={showFollowers || showFollowings}
              />
              <UserListView
                title={showFollowers ? "Followers" : "Following"}
                loading={loading_followers_or_following}
                users={(showFollowers ? followersList : followingList) || []}
                toggle={() => (showFollowers ? toggleModal(setShowFollowers) : toggleModal(setShowFollowings))}
              />
            </Fragment>
          )}
        </div>
      )}

      {showLoginNeededPrompt && (
        <Fragment>
          <LoginPrompt profilePage={true} toggle={() => toggleModal(setShowLoginNeededPrompt)} />
          <Backdrop show={showLoginNeededPrompt} toggle={() => toggleModal(setShowLoginNeededPrompt)} />
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state: any) => {
  return {
    loading: state.profile.loading,
    currentUsername: state.user.currentUserData.username,
    currentUserUid: state.user.currentUserData.uid,
    profiles: state.profile.profiles,
    loading_followers_or_following: state.profile.loading_followers_or_following,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    FETCH_FOLLOWERS: (username: string) => dispatch(profileActions.FETCH_FOLLOWERS(username)),
    FETCH_FOLLOWINGS: (username: string) => dispatch(profileActions.FETCH_FOLLOWINGS(username)),
    UNFOLLOW: (unfollowing_user_uid: string, unfollower_user_uid: string) =>
      dispatch(profileActions.UNFOLLOW(unfollowing_user_uid, unfollower_user_uid)),
    FOLLOW: (following_user_uid: string, follower_user_uid: string) =>
      dispatch(profileActions.FOLLOW(following_user_uid, follower_user_uid)),
    GET_PROFILE_DATA: (profile_username: string) => dispatch(profileActions.GET_PROFILE_DATA(profile_username)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profilepage);
