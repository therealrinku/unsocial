import React from "react";
import { Link } from "react-router-dom";
import * as Icons from "../Icons/CustomIcons";
import { connect } from "react-redux";

const MobileNavbar = ({ currentUsername, currentUserProfileimage }) => {
  return (
    <div
      className="navbar--mobile"
      style={!currentUsername ? { display: "none" } : null}
    >
      <Link to="/">
        <Icons.HomeIcon />
      </Link>

      <Link to="/explore">
        <Icons.SearchIcon />
      </Link>

      <Link to="/">
        <Icons.NewPostIcon />
      </Link>

      <Link to="/activity">
        <Icons.ActivityIcon />
      </Link>

      <Link to={`${currentUsername}`}>
        <img
          src={currentUserProfileimage || "https://bit.ly/3pc96tw"}
          alt="profile_image"
        />
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUsername: state.user.currentUserData.username,
    currentUserProfileimage: state.user.currentUserData.profile_image_url,
  };
};

export default connect(mapStateToProps)(MobileNavbar);
