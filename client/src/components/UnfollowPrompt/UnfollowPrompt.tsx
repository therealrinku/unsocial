import Modal from "../Modal";
import { FiUserMinus, FiX } from "react-icons/fi";
import styles from "./UnfollowPrompt.module.scss";

type UnfollowPromptTypes = {
  UNFOLLOW: any;
  toggle: any;
  profileImage: string;
  profileUsername: string;
};

const UnfollowPrompt = ({
  UNFOLLOW,
  toggle,
  profileImage,
  profileUsername,
}: UnfollowPromptTypes) => {
  const unfollow = () => {
    UNFOLLOW();
    toggle();
  };
  return (
    <Modal hideTitleBar>
      <div className={styles.UnfollowPrompt}>
        <div>
          <img src={profileImage} alt="profile_image" />
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
    </Modal>
  );
};

export default UnfollowPrompt;
