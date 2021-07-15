const UnfollowPrompt = ({
  UNFOLLOW,
  toggle,
  profileImage,
  profileUsername,
}) => {
  const unfollow = () => {
    UNFOLLOW();
    toggle();
  };
  return (
    <div className="unfollow--confirmation-modal">
      <div>
        <img src={profileImage} alt="profile_image" />
        <p>Unfollow {profileUsername}?</p>
      </div>

      <button style={{ color: "red" }} onClick={unfollow}>
        Unfollow
      </button>
      <button onClick={toggle}>Cancel</button>
    </div>
  );
};

export default UnfollowPrompt;
