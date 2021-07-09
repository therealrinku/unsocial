import { useHistory } from "react-router-dom";
import { FiX, FiAlertOctagon, FiEdit, FiTool, FiCornerUpRight } from "react-icons/all";

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
      <button style={!isMyProfile ? { display: "none" } : null} onClick={goToProfileEditPage}>
        <FiEdit />
        <p>Edit Profile</p>
      </button>
      <button style={isMyProfile ? { display: "none" } : { color: "tomato" }}>
        <FiAlertOctagon />
        <p>Report This User</p>
      </button>
      <button style={!isMyProfile ? { display: "none" } : null} onClick={goToPasswordEditPage}>
        <FiTool />
        <p>Change Password</p>
      </button>
      <button style={!isMyProfile ? { display: "none" } : { color: "tomato" }} onClick={LOGOUT}>
        <FiCornerUpRight />
        <p>Log Out</p>
      </button>

      <button onClick={toggle}>
        <FiX />
        <p>Cancel</p>
      </button>
    </div>
  );
};

export default PostOptionsModal;
