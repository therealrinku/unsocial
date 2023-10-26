import Modal from "../Modal";
import { FiUserMinus, FiX } from "react-icons/fi";

type UnfollowPromptTypes = {
  UNFOLLOW: any;
  toggle: any;
  profileImage: string;
  profileUsername: string;
};

const UnfollowPrompt = ({ UNFOLLOW, toggle, profileImage, profileUsername }: UnfollowPromptTypes) => {
  const unfollow = () => {
    UNFOLLOW();
    toggle();
  };
  return (
    <Modal hideTitleBar>
      <div className="flex flex-col items-center gap-2 text-sm">
        <div>
          <img className="h-20 w-20 object-cover" src={profileImage} alt="profile_image" />
        </div>

        <div className="flex w-full flex-col items-center gap-2 mt-5">
          <button className="w-full text-sm mt-5 bg-[#EE323D] text-white p-[6px] px-5" onClick={unfollow}>
            <p>Unfollow {profileUsername}</p>
          </button>

          <button className="mt-3 hover:underline" onClick={toggle}>
            <p>Cancel</p>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UnfollowPrompt;
