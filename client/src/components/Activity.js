import { useHistory } from "react-router-dom";

const Activity = () => {
  const history = useHistory();
  const [notifications, setNotifications] = useState([]);

  return (
    <div className="notification-list">
      {notifications.length > 0 ? (
        notifications
          .sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          })
          .map((noti) => {
            return (
              <div
                style={loading ? { display: "none" } : { width: "100%" }}
                key={noti.id}
              >
                <div
                  className="notification"
                  onClick={() =>
                    noti.postId !== null
                      ? history.push(`/viewPost/${noti.postId}`)
                      : notification === "follow"
                      ? history.push(`/profile/${noti.username}`)
                      : ""
                  }
                >
                  <div className="left">
                    <img
                      src={noti.profileimage}
                      alt="profile-pc"
                      className="profile-pic"
                    />
                    <p>
                      {noti.username}{" "}
                      {noti.notification === "like post"
                        ? " liked your post."
                        : noti.notification === "like comment"
                        ? " liked your comment."
                        : noti.notification === "comment added"
                        ? " commented on your post."
                        : noti.notification === "follow"
                        ? "started following you."
                        : ""}
                      <b style={{ color: "grey" }}>{noti.date}</b>
                    </p>
                  </div>
                  <img
                    style={noti.postimage === null ? { display: "none" } : null}
                    src={noti.postimage}
                    alt="profile-pc"
                    className="post-img"
                  />
                </div>
              </div>
            );
          })
      ) : (
        <p
          style={
            loading
              ? { display: "none" }
              : { textAlign: "center", fontSize: "14px" }
          }
        >
          No notifications
        </p>
      )}
      <div style={!loading ? { display: "none" } : null}>
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default Activity;
