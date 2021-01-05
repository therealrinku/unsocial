import React, { useEffect } from "react";
import ProfileSummary from "../components/ProfileSummary";
import Navbar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";
import * as profileActions from "../redux/profile/ProfileActions";
import { connect } from "react-redux";

const Profilepage = ({
  history,
  currentUserUid,
  profiles,
  GET_PROFILE_DATA,
}) => {
  const profileUsername = history.location.pathname.slice(1);
  const profileData = profiles.filter(
    (profile) => profile.username === profileUsername
  );

  useEffect(() => {
    if (profileData.length <= 0) {
      GET_PROFILE_DATA(profileUsername, currentUserUid);
    }
  }, [profileUsername]);

  return (
    <div className="profile--page">
      <Navbar />
      <ProfileSummary profileData={profileData[0] || []} />
      <MobileNavbar />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
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
