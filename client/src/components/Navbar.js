import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as Icons from "../Icons/CustomIcons";
import SearchView from "./SearchView";
import { useHistory } from "react-router-dom";
import Activity from "./Activity";
import Backdrop from "./Backdrop";
import OverflowToggler from "../utilities/overflowToggler";
import Badge from "@material-ui/core/Badge";

const Navbar = ({
  currentUsername,
  currentUserProfileimage,
  currentUserUid,
}) => {
  const history = useHistory();
  const pathname = history.location.pathname;
  const [showActivity, setShowActivity] = useState(false);

  const toggleActivity = () => {
    OverflowToggler();
    setShowActivity((prev) => !prev);
  };

  return (
    <Fragment>
      <div className="navbar">
        <ul>
          <Link to="/">Instaclone</Link>
        </ul>

        <ul>
          <SearchView />
        </ul>

        <ul style={currentUsername ? { display: "none" } : null}>
          <button className="login--btn" onClick={() => history.push("/login")}>
            Login
          </button>
          <button
            className="signup--btn"
            onClick={() => history.push("/signup")}
          >
            Signup
          </button>
        </ul>

        <ul
          className="right"
          style={!currentUsername ? { display: "none" } : null}
        >
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

          <button onClick={toggleActivity}>
            <Badge badgeContent={4} color="error">
              <Icons.ActivityIcon />
            </Badge>
          </button>

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

      {showActivity ? (
        <Fragment>
          <Backdrop show={showActivity} toggle={toggleActivity} />
          <Activity currentUserUid={currentUserUid} toggle={toggleActivity} />
        </Fragment>
      ) : null}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUserUid: state.user.currentUserData.uid,
    currentUsername: state.user.currentUserData.username,
    currentUserProfileimage: state.user.currentUserData.profile_image_url,
  };
};

export default connect(mapStateToProps)(Navbar);
