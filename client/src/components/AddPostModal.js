import React, { useMemo, useState } from "react";

const AddPostModal = ({
  uploadPost,
  toggle,
  selectedImage,
  currentUserProfileImage,
  status,
  setStatus,
}) => {
  const selectedImageFile = useMemo(() => {
    return selectedImage ? URL.createObjectURL(selectedImage) : null;
  }, [selectedImage]);

  return (
    <div className="add--post-modal">
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

      <div>
        <button onClick={uploadPost}>Post</button>
        <button onClick={toggle}>Cancel</button>
      </div>
    </div>
  );
};

export default AddPostModal;
