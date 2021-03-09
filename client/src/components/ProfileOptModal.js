import { useHistory } from "react-router-dom";

const PostOptionsModal = ({ toggle, isMyProfile, LOGOUT }) => {
  const history = useHistory();

  const goToProfileEditPage = () => {
    toggle();
    history.push("/edit/profile");
  };

  const goToPasswordEditPage = () => {
    toggle();
    history.push("/edit/password");
  };

  return (
    <div className="profile--options-modal">
      <button
        style={!isMyProfile ? { display: "none" } : null}
        onClick={goToProfileEditPage}
      >
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
      <button
        style={!isMyProfile ? { display: "none" } : null}
        onClick={goToPasswordEditPage}
      >
        Change Password
      </button>
      <button
        style={!isMyProfile ? { display: "none" } : { color: "red" }}
        onClick={LOGOUT}
      >
        Log Out
      </button>

      <button onClick={toggle}>Cancel</button>
    </div>
  );
};

export default PostOptionsModal;
