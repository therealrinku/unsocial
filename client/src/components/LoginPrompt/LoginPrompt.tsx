import { useHistory } from "react-router-dom";
import Modal from "../Modal";

type LoginPromptTypes = {
  toggle: any;
  profilePage?: boolean;
};

const LoginPrompt = ({ toggle, profilePage }: LoginPromptTypes) => {
  const history = useHistory();

  const goToLoginPage = () => {
    toggle();
    history.push("/");
  };

  return (
    <Modal hideTitleBar>
      <div className="text-sm">
        <p>You need to login to interact with the {profilePage ? "profile" : "post"}.</p>
        <button className="mt-5 bg-[#018e23] text-white py-[6px] px-5" onClick={goToLoginPage}>
          Login
        </button>
        <button className="ml-3" onClick={toggle}>
          Not interested
        </button>
      </div>
    </Modal>
  );
};

export default LoginPrompt;
