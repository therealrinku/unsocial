import React, { Fragment, useEffect, useState } from "react";
import ProfileSummary from "../components/ProfileSummary";
import Navbar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";
import * as profileActions from "../redux/profile/ProfileActions";
import { connect } from "react-redux";
import overflowToggler from "../utilities/overflowToggler";
import ProfileOptModal from "../components/ProfileOptModal";
import Backdrop from "../components/Backdrop";

const Profilepage = ({
  history,
  currentUserUid,
  profiles,
  GET_PROFILE_DATA,
  currentUsername,
}) => {
  const profileUsername = history.location.pathname.slice(1);
  const profileData = profiles.filter(
    (profile) => profile?.username === profileUsername
  );

  //modal handlers
  const [showProfileOptionsModal, setShowProfileOptionsModal] = useState(false);
  const [showUnfollowPrompt, setShowUnfollowPrompt] = useState(false);

  const toggleModal = (setModal) => {
    setModal((prev) => !prev);
    overflowToggler();
  };

  useEffect(() => {
    if (profileData.length <= 0) {
      GET_PROFILE_DATA(profileUsername, currentUserUid);
    }
  }, [profileUsername]);

  return (
    <div className="profile--page">
      <Navbar />
      <ProfileSummary
        profileData={profileData[0] || []}
        toggleProfileOptions={() => toggleModal(setShowProfileOptionsModal)}
        toggleUnfollowPrompt={() => toggleModal(setShowUnfollowPrompt)}
        isMyProfile={currentUsername === profileUsername}
      />
      <MobileNavbar />
      {showProfileOptionsModal ? (
        <Fragment>
          <ProfileOptModal
            toggle={() => toggleModal(setShowProfileOptionsModal)}
            isMyProfile={currentUsername === profileUsername}
          />
          <Backdrop
            show={showProfileOptionsModal}
            toggle={() => toggleModal(setShowProfileOptionsModal)}
          />
        </Fragment>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUsername: state.user.currentUserData.username,
    currentUserUid: state.user.currentUserData.uid,
    profiles: state.profile.profiles,
    loading: state.profile.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GET_PROFILE_DATA: (profile_username, current_user_uid) =>
      dispatch(
        profileActions.GET_PROFILE_DATA(profile_username, current_user_uid)
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profilepage);
