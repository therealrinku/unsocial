import * as Icons from "../Icons/CustomIcons";

const ProfileButtonLine = ({
  viewMode = "posts",
  no_posts,
  setViewMode,
  isMyProfile,
}) => {
  return (
    <div className="profile--button-line">
      {!no_posts ? (
        <div>
          <button
            onClick={() => setViewMode("posts")}
            className={viewMode === "posts" ? "active" : null}
          >
            <Icons.GridIcon />
            <p>Posts</p>
          </button>

          <button
            onClick={() => setViewMode("saved_posts")}
            style={!isMyProfile ? { display: "none" } : null}
            className={viewMode === "saved_posts" ? "active" : null}
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
