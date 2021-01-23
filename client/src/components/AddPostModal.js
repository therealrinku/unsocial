import React, { useMemo, useState } from "react";
import { VscChromeClose } from "react-icons/all";
import { connect } from "react-redux";
import * as postsActions from "../redux/post/postsActions";

const AddPostModal = ({
  UPLOAD_POST,
  toggle,
  selectedImage,
  currentUserProfileImage,
  currentUserUid,
  currentUsername,
}) => {
  const selectedImageFile = useMemo(() => {
    return selectedImage ? URL.createObjectURL(selectedImage) : null;
  }, [selectedImage]);

  const [status, setStatus] = useState("");

  const uploadPost = () => {
    if (selectedImage) {
      toggle();
      UPLOAD_POST({
        owner_uid: currentUserUid,
        status: status,
        currentUsername: currentUsername,
        image: selectedImage,
        posted_date: new Date(),
        currentUserProfileImage: currentUserProfileImage,
      });
    }
  };

  return (
    <div className="add--post-modal">
      <div>
        <button onClick={toggle}>
          <VscChromeClose />
        </button>
        <button onClick={uploadPost}>Post</button>
      </div>

      <div>
        <img src={currentUserProfileImage} alt="my_profile_image" />
        <input
          type="text"
          placeholder="Type your status here"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <img src={selectedImageFile} alt="post_img" />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUsername: state.user.currentUserData.username,
    currentUserUid: state.user.currentUserData.uid,
    currentUserProfileImage: state.user.currentUserData.profile_image_url,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    UPLOAD_POST: (post_data) => dispatch(postsActions.UPLOAD_POST(post_data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPostModal);
