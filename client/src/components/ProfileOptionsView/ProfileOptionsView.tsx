import { useHistory } from "react-router-dom";
import styles from "./ProfileOptionsView.module.scss";
import Modal from "../Modal";
import {
  FiEdit,
  FiRotateCw,
  FiArrowDownLeft,
  FiX,
  FiAlertCircle,
} from "react-icons/fi";

type ProfileOptionsViewTypes = {
  toggle: any;
  isMyProfile: boolean;
  LOGOUT: any;
};

const ProfileOptionsView = ({
  toggle,
  isMyProfile,
  LOGOUT,
}: ProfileOptionsViewTypes) => {
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
    <Modal hideTitleBar>
      <div className={styles.ProfileOptionsView}>
        {isMyProfile && (
          <>
            <button onClick={goToProfileEditPage}>
              <FiEdit />
              <p>Edit profile</p>
            </button>
            <button onClick={goToPasswordEditPage}>
              <FiRotateCw />
              <p>Change password</p>
            </button>
            <button onClick={LOGOUT} style={{ color: "tomato" }}>
              <FiArrowDownLeft />
              <p>Log out</p>
            </button>
          </>
        )}

        {!isMyProfile && (
          <button style={{ color: "tomato" }}>
            <FiAlertCircle />
            <p>Report this user</p>
          </button>
        )}

        <button onClick={toggle}>
          <FiX />
          <p>Cancel</p>
        </button>
      </div>
    </Modal>
  );
};

export default ProfileOptionsView;
