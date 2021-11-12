import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import clearNotification from "../../utilities/clearNotification";
import styles from "./NotificationsPage.module.scss";
import server_url from "../../server_url";
import { connect } from "react-redux";
import placeholderImage from "../../assets/placeholder.jpg";
import lazyLoadImage from "../../utilities/lazyLoadImage.js";
import ProfilePicPlaceholder from "../../assets/avatar.jpg";

type NotificationsPageTypes = {
  currentUserUid: string;
};

const NotificationsPage = ({ currentUserUid }: NotificationsPageTypes) => {
  const history = useHistory();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clearNotification(currentUserUid);

    axios
      .get(`${server_url}/user/getNotifications/${currentUserUid}`)
      .then((res) => {
        setNotifications(res.data);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.NotificationsPage}>
      <div className={styles.Notifications}>
        {notifications.length > 0 ? (
          notifications
            .sort((a: any, b: any) => {
              return new Date(b.date).valueOf() - new Date(a.date).valueOf();
            })
            .map((noti: any) => {
              return (
                <div
                  className={styles.Notification}
                  style={loading ? { display: "none" } : { width: "100%" }}
                  key={noti.uid}
                  onClick={() =>
                    noti.post_id !== null
                      ? history.push(`/p/${noti.post_id}`)
                      : noti.notification === "follow"
                      ? history.push(`/user/${noti.username}`)
                      : ""
                  }
                >
                  <img
                    data-src={noti.profile_image_url}
                    src={ProfilePicPlaceholder}
                    className={`lazy-image ${styles.ProfilePic}`}
                    onLoad={lazyLoadImage}
                    alt="profile-pc"
                  />
                  <p>
                    {noti.username}{" "}
                    {noti.notification === "like post"
                      ? " liked your post."
                      : noti.notification === "dislike post"
                      ? " disliked your post."
                      : noti.notification === "like comment"
                      ? " liked your comment."
                      : noti.notification === "comment added"
                      ? " commented on your post."
                      : noti.notification === "follow"
                      ? "started following you."
                      : ""}
                    <b style={{ color: "grey" }}>{noti.date}</b>
                  </p>

                  {noti.post_image && (
                    <img
                      data-src={noti.post_image}
                      src={placeholderImage}
                      className={`lazy-image ${styles.PostImage}`}
                      onLoad={lazyLoadImage}
                      alt="profile-pc"
                    />
                  )}
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

const mapStateToProps = (state: any) => {
  return {
    currentUserUid: state.user.currentUserData.uid,
  };
};

export default connect(mapStateToProps)(NotificationsPage);
