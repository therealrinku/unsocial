import { FiUserMinus, FiX } from "react-icons/all";

const UnfollowPrompt = ({ UNFOLLOW, toggle, profileImage, profileUsername }) => {
  const unfollow = () => {
    UNFOLLOW();
    toggle();
  };
  return (
    <div className="unfollow--confirmation-modal">
      <div>
        <img src={profileImage} alt="profile_image" />
        <p style={{ textAlign: "center", fontSize: "15px", color: "tomato" }}>Unfollow {profileUsername}?</p>
      </div>

      <button style={{ color: "tomato" }} onClick={unfollow}>
        <FiUserMinus />
        <p>Unfollow</p>
      </button>
      <button onClick={toggle}>
        <FiX />
        <p>Cancel</p>
      </button>
    </div>
  );
};

export default UnfollowPrompt;
