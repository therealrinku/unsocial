import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import * as Icons from "../Icons/CustomIcons";
import { connect } from "react-redux";
import toggleOverflow from "../utilities/overflowToggler";
import AddPost from "./AddPostModal";
import overflowToggler from "../utilities/overflowToggler";
import Activity from "./Activity";
import Backdrop from "./Backdrop";
import Badge from "@material-ui/core/Badge";

const MobileNavbar = ({
  currentUsername,
  currentUserProfileimage,
  currentUserUid,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAddPost, setShowAddPost] = useState(false);
  const [showActivity, setShowActivity] = useState(false);

  const toggleActivity = () => {
    overflowToggler();
    setShowActivity((prev) => !prev);
  };

  const toggleAddPostModal = () => {
    toggleOverflow();
    setShowAddPost((prev) => !prev);
  };

  const updateFile = (e) => {
    if (e.target.files[0]) {
      toggleAddPostModal();
      setSelectedImage(e.target.files[0]);
    }
  };

  return (
    <Fragment>
      <div
        className="navbar--mobile"
        style={!currentUsername ? { display: "none" } : null}
      >
        {showAddPost ? (
          <AddPost selectedImage={selectedImage} toggle={toggleAddPostModal} />
        ) : null}

        <Link to="/">
          <Icons.HomeIcon />
        </Link>

        <Link to="/explore">
          <Icons.SearchIcon />
        </Link>

        <div>
          <input
            type="file"
            id="file_input"
            onChange={updateFile}
            name="post"
          />
          <label htmlFor="file_input">
            <Icons.NewPostIcon />
          </label>
        </div>

        <button onClick={toggleActivity}>
          <Badge badgeContent={4} color="error">
            <Icons.ActivityIcon />
          </Badge>
        </button>

        <Link to={`/${currentUsername}`}>
          <img
            src={currentUserProfileimage || "https://bit.ly/3pc96tw"}
            alt="profile_image"
          />
        </Link>
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

export default connect(mapStateToProps)(MobileNavbar);
