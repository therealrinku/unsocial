import React, { useMemo } from "react";
import { VscChromeClose } from "react-icons/all";

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

export default AddPostModal;
