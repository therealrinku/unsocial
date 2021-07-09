import { FiGrid, FiSave } from "react-icons/all";

const ProfileButtonLine = ({
  showSavedPosts,
  no_posts,
  no_saved_posts,
  hideSavedPosts,
  viewSavedPosts,
  isMyProfile,
}) => {
  return (
    <div className="profile--button-line">
      <button
        onClick={hideSavedPosts}
        className={!showSavedPosts ? "active" : null}
        style={no_posts && !isMyProfile ? { display: "none" } : null}
      >
        <FiGrid />
        <p>Posts</p>
      </button>

      <button
        onClick={viewSavedPosts}
        style={!isMyProfile ? { display: "none" } : null}
        className={showSavedPosts ? "active" : null}
      >
        <FiSave />
        <p>Saved Posts</p>
      </button>
    </div>
  );
};

export default ProfileButtonLine;
