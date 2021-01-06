import * as Icons from "../Icons/CustomIcons";

const ProfileButtonLine = ({
  showSavedPosts,
  no_posts,
  hideSavedPosts,
  viewSavedPosts,
  isMyProfile,
}) => {
  return (
    <div className="profile--button-line">
      {!no_posts ? (
        <div>
          <button
            onClick={hideSavedPosts}
            className={!showSavedPosts ? "active" : null}
          >
            <Icons.GridIcon />
            <p>Posts</p>
          </button>

          <button
            onClick={viewSavedPosts}
            style={!isMyProfile ? { display: "none" } : null}
            className={showSavedPosts ? "active" : null}
          >
            <Icons.PostActionBarSaveIcon />
            <p>Saved</p>
          </button>
        </div>
      ) : (
        <p style={{ fontSize: "15px" }}>No any posts.</p>
      )}
    </div>
  );
};

export default ProfileButtonLine;
