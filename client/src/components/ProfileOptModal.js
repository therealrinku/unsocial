const PostOptionsModal = ({ toggle, isMyProfile }) => {
  return (
    <div className="profile--options-modal">
      <button style={!isMyProfile ? { display: "none" } : null}>
        Edit Profile
      </button>
      <button
        style={
          isMyProfile
            ? { display: "none" }
            : {
                color: "red",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }
        }
      >
        Report This User
      </button>
      <button style={!isMyProfile ? { display: "none" } : null}>
        Change Password
      </button>
      <button style={!isMyProfile ? { display: "none" } : { color: "red" }}>
        Log Out
      </button>

      <button onClick={toggle}>Cancel</button>
    </div>
  );
};

export default PostOptionsModal;
