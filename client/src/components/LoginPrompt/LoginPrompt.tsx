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
      <div className="text-sm flex flex-col gap-2 items-center">
        <p>You need to login to interact with the {profilePage ? "profile" : "post"}.</p>
        <button className="w-full text-sm mt-5 bg-[#018e2e] text-white p-[6px] px-5" onClick={goToLoginPage}>
          Login
        </button>
        <button className="mt-3 hover:underline" onClick={toggle}>
          Not interested
        </button>
      </div>
    </Modal>
  );
};

export default LoginPrompt;
