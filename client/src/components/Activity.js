import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { VscClose } from "react-icons/all";

const Activity = ({ currentUserUid, toggle }) => {
  const history = useHistory();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/user/getNotifications/${currentUserUid}`)
      .then((res) => {
        setNotifications(res.data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="notification-list">
      <div className="top">
        <p>Activity</p>
        <button onClick={toggle}>
          <VscClose />
        </button>
      </div>

      <div className="notifications">
        {notifications.length > 0 ? (
          notifications
            .sort((a, b) => {
              return new Date(b.date) - new Date(a.date);
            })
            .map((noti) => {
              return (
                <div
                  style={loading ? { display: "none" } : { width: "100%" }}
                  key={noti.uid}
                >
                  <div
                    className="notification"
                    onClick={() =>
                      noti.postId !== null
                        ? history.push(`/viewPost/${noti.post_id}`)
                        : noti.notification === "follow"
                        ? history.push(`/profile/${noti.username}`)
                        : ""
                    }
                  >
                    <div className="left">
                      <img
                        src={noti.profile_image_url}
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
                      style={
                        noti.post_image === null ? { display: "none" } : null
                      }
                      src={noti.post_image}
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
      </div>
      <div
        style={
          !loading
            ? { display: "none" }
            : { textAlign: "center", fontSize: "14px" }
        }
      >
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default Activity;
