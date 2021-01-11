import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as Icons from "../Icons/CustomIcons";
import SearchView from "./SearchView";
import { useHistory } from "react-router-dom";

const Navbar = ({ currentUsername, currentUserProfileimage }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const history = useHistory();
  const pathname = history.location.pathname;

  return (
    <div className="navbar">
      <ul>
        <Link to="/">Instaclone</Link>
      </ul>

      <ul>
        <SearchView />
      </ul>

      <ul className="right">
        <Link to="/">
          {pathname === "/" ? <Icons.HomeActiveIcon /> : <Icons.HomeIcon />}
        </Link>

        <Link to="/chat">
          <Icons.ChatIcon />
        </Link>

        <Link to="/explore">
          {pathname === "/explore" ? (
            <Icons.ExploreActiveIcon />
          ) : (
            <Icons.ExploreIcon />
          )}
        </Link>

        <Link to="/activity">
          <Icons.ActivityIcon />
        </Link>

        <Link to={`/${currentUsername}`}>
          <img
            style={
              pathname === `/${currentUsername}`
                ? {
                    border: "solid 1px black",
                    padding: "2px",
                    width: "20px",
                    height: "20px",
                  }
                : null
            }
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
