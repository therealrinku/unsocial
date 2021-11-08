import { useHistory } from "react-router-dom";
import Modal from "../Modal";
import styles from "./LoginPrompt.module.scss";

type LoginPromptTypes = {
  toggle: any;
  profilePage?: boolean;
};

const LoginPrompt = ({ toggle, profilePage }: LoginPromptTypes) => {
  const history = useHistory();

  const goToLoginPage = () => {
    toggle();
    history.push("/login");
  };

  return (
    <Modal hideTitleBar>
      <div className={styles.LoginPrompt}>
        <p>
          You need to login to interact with the{" "}
          {profilePage ? "profile" : "post"}.
        </p>
        <button onClick={goToLoginPage} className={styles.LoginButton}>
          Login
        </button>
        <button onClick={toggle}>Not interested</button>
      </div>
    </Modal>
  );
};

export default LoginPrompt;
