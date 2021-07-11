import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import clearNotification from "../utilities/clearNotification";
import { connect } from "react-redux";

const ActivityPage = ({ currentUserUid }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clearNotification(currentUserUid);

    axios.get(`https://instacloone.herokuapp.com/user/getNotifications/${currentUserUid}`).then((res) => {
      setNotifications(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="notification-list">
      <div className="top">Activity</div>

      <div className="notifications">
        {notifications.length > 0 ? (
          notifications
            .sort((a, b) => {
              return new Date(b.date) - new Date(a.date);
            })
            .map((noti) => {
              return (
                <Link
                  className="notification"
                  style={loading ? { display: "none" } : { width: "100%" }}
                  key={noti.uid}
                  to={() =>
                    noti.post_id !== null
                      ? `/p/${noti.post_id}`
                      : noti.notification === "follow"
                      ? `/${noti.username}`
                      : ""
                  }
                >
                  <img src={noti.profile_image_url} alt="profile-pc" className="profile-pic" />
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

                  <img
                    style={noti.post_image === null ? { display: "none" } : null}
                    src={noti.post_image}
                    alt="profile-pc"
                    className="post-img"
                  />
                </Link>
              );
            })
        ) : (
          <p style={loading ? { display: "none" } : { textAlign: "center", fontSize: "14px" }}>No notifications</p>
        )}
      </div>
      <div style={!loading ? { display: "none" } : { textAlign: "center", fontSize: "14px" }}>
        <p>Loading...</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUserUid: state.user.currentUserData.uid,
  };
};

export default connect(mapStateToProps)(ActivityPage);
