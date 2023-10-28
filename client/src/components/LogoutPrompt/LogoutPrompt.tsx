import Modal from "../Modal";

type LogoutPromptTypes = {
  toggle: any;
  logout: () => void;
};

const LogoutPrompt = ({ toggle, logout }: LogoutPromptTypes) => {
  return (
    <Modal hideTitleBar>
      <div className="text-sm flex flex-col gap-2 items-center">
        <p>Are you sure want to logout?</p>
        <button className="w-full text-sm mt-5 bg-[#018e2e] text-white p-[6px] px-5" onClick={logout}>
          Logout
        </button>
        <button className="mt-3 hover:underline" onClick={toggle}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default LogoutPrompt;
