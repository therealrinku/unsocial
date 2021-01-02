import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as Icons from "../Icons/CustomIcons";

const Navbar = ({ currentUsername, currentUserProfileimage }) => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="navbar">
      <ul>
        <Link to="/">Instaclone</Link>
      </ul>

      <ul>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </ul>

      <ul className="right">
        <Link to="/">
          <Icons.HomeIcon />
        </Link>

        <Link to="/chat">
          <Icons.ChatIcon />
        </Link>

        <Link to="/explore">
          <Icons.ExploreIcon />
        </Link>

        <Link to="/activity">
          <Icons.ActivityIcon />
        </Link>

        <Link to={`/${currentUsername}`}>
          <img
            src={currentUserProfileimage || "https://bit.ly/3pc96tw"}
            alt="profile_image"
          />
        </Link>
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUsername: state.user.currentUserData.username,
    currentUserProfileimage: state.user.currentUserData.profile_image_url,
  };
};

export default connect(mapStateToProps)(Navbar);
