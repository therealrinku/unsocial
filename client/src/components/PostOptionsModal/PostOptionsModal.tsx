import { useState } from "react";
import { useHistory } from "react-router-dom";
import { FiCornerUpRight, FiTrash2, FiClipboard, FiX } from "react-icons/fi";

type PostOptionsViewTypes = {
  post_id: string;
  isMyPost: boolean;
  toggle: any;
  deletePost: any;
  AddMessage: any;
  hideGoToPost: boolean | undefined;
};

const PostOptionsView = ({ post_id, isMyPost, toggle, deletePost, AddMessage, hideGoToPost }: PostOptionsViewTypes) => {
  const [showDeleteConfirmer, setShowDeleteConfirmer] = useState(false);
  const history = useHistory();

  const goToPost = () => {
    toggle();
    history.push(`/p/${post_id}`);
  };

  const copyToClipBoard = () => {
    toggle();
    navigator.clipboard.writeText(`https://uns0cial.web.app/p/${post_id}`);
    AddMessage("Post link copied.");
    setTimeout(() => {
      AddMessage(null);
    }, 3000);
  };

  return (
    <div className="absolute w-[150px] right-0 top-[37px] bg-white flex flex-col border text-sm px-3">
      {showDeleteConfirmer ? (
        <div>
          <div>
            <p className="py-3">Are you sure?</p>
          </div>

          <div className="flex flex-col">
            <button className="flex items-center gap-1 border-b py-2" onClick={deletePost}>
              <FiTrash2 color="red" />
              <p className="text-red-500">Delete</p>
            </button>
            <button className="flex items-center gap-1 py-2" onClick={toggle}>
              <FiX />
              <p>Cancel</p>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <button
            className="flex items-center gap-1 border-b py-2"
            onClick={goToPost}
            style={hideGoToPost ? { display: "none" } : undefined}
          >
            <FiCornerUpRight />
            <p>Go to post</p>
          </button>
          {isMyPost && (
            <button
              className="flex items-center gap-1 border-b py-2"
              onClick={() => setShowDeleteConfirmer((prev) => !prev)}
            >
              <FiTrash2 color="red" />
              <p className="text-red-500">Delete</p>
            </button>
          )}
          <button className="flex items-center gap-1 py-2" onClick={copyToClipBoard}>
            <FiClipboard />
            <p>Copy link</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default PostOptionsView;
