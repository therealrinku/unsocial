import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Icons from "../Icons/CustomIcons";
import { connect } from "react-redux";
import toggleOverflow from "../utilities/overflowToggler";
import AddPost from "./AddPostModal";

const MobileNavbar = ({ currentUsername, currentUserProfileimage }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAddPost, setShowAddPost] = useState(false);

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
    <div
      className="navbar--mobile"
      style={!currentUsername ? { display: "none" } : null}
    >
      {showAddPost ? <AddPost selectedImage={selectedImage} /> : null}

      <Link to="/">
        <Icons.HomeIcon />
      </Link>

      <Link to="/explore">
        <Icons.SearchIcon />
      </Link>

      <div>
        <input type="file" id="file_input" onChange={updateFile} name="post" />
        <label htmlFor="file_input">
          <Icons.NewPostIcon />
        </label>
      </div>

      <Link to="/activity">
        <Icons.ActivityIcon />
      </Link>

      <Link to={`/${currentUsername}`}>
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
