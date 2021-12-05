import { useHistory } from "react-router-dom";
import styles from "./ProfileOptionsModal.module.scss";
import { FiEdit, FiUser, FiRotateCw, FiArrowDownLeft } from "react-icons/fi";

type ProfileOptionsViewTypes = {
  toggle: any;
  LOGOUT: any;
  currentUsername: string;
};

const ProfileOptionsModal = ({
  toggle,
  LOGOUT,
  currentUsername,
}: ProfileOptionsViewTypes) => {
  const history = useHistory();

  const goTo = (location: string) => {
    toggle();
    history.replace(location);
  };

  return (
    <div className={styles.ProfileOptionsModal}>
      <button onClick={() => goTo(`/user/${currentUsername}`)}>
        <FiUser />
        <p>My profile</p>
      </button>
      <button onClick={() => goTo("/edit/profile")}>
        <FiEdit />
        <p>Edit profile</p>
      </button>
      <button onClick={() => goTo("/edit/password")}>
        <FiRotateCw />
        <p>Change password</p>
      </button>
      <button onClick={LOGOUT} style={{ color: "tomato" }}>
        <FiArrowDownLeft />
        <p>Log out</p>
      </button>
    </div>
  );
};

export default ProfileOptionsModal;
