import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import clearNotification from "../../utilities/clearNotification";
import styles from "./NotificationsPage.module.scss";
import server_url from "../../server_url";
import { connect } from "react-redux";
import placeholderImage from "../../assets/placeholder.jpg";
import lazyLoadImage from "../../utilities/lazyLoadImage.js";
import ProfilePicPlaceholder from "../../assets/avatar.jpg";
import Moment from "react-moment";
import TwoColumnLayout from "../../components/TwoColumnLayout";
import MainSideview from "../../components/MainSideview";

type NotificationsPageTypes = {
  currentUserUid: string;
};

const NotificationsPage = ({ currentUserUid }: NotificationsPageTypes) => {
  const history = useHistory();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUserUid) {
      clearNotification(currentUserUid);
    }

    axios.get(`${server_url}/user/getNotifications/${currentUserUid}`).then((res) => {
      setNotifications(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <TwoColumnLayout
      component2={() => <MainSideview />}
      component1={() => (
        <div className="bg-white p-5 text-sm border">
          <div className="flex flex-col gap-2">
            {notifications.length > 0 ? (
              notifications
                .sort((a: any, b: any) => {
                  return new Date(b.date).valueOf() - new Date(a.date).valueOf();
                })
                .map((noti: any) => {
                  return (
                    <div
                      className="flex items-center gap-2 justify-between"
                      style={loading ? { display: "none" } : { width: "100%" }}
                      key={noti.uid}
                    >
                      <div className="flex items-center gap-2">
                        <img
                          data-src={noti.profile_image_url}
                          src={ProfilePicPlaceholder}
                          className={`lazy-image  h-7 w-7 rounded-full object-cover`}
                          onLoad={lazyLoadImage}
                          alt="profile-pc"
                        />
                        <p>
                          <Link to={`/user/${noti.username}`} className="font-bold hover:underline">
                            {noti.username}{" "}
                          </Link>
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
                          <i>
                            {" "}
                            <Moment fromNow>{noti.date}</Moment>
                          </i>
                        </p>
                      </div>

                      {noti.post_image && (
                        <img
                          data-src={noti.post_image}
                          src={placeholderImage}
                          className={`lazy-image h-12 w-12 object-cover`}
                          onLoad={lazyLoadImage}
                          alt="profile-pc"
                          onClick={() =>
                            noti.post_id !== null
                              ? history.push(`/p/${noti.post_id}`)
                              : noti.notification === "follow"
                              ? history.push(`/user/${noti.username}`)
                              : ""
                          }
                        />
                      )}
                    </div>
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
      )}
    />
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentUserUid: state.user.currentUserData.uid,
  };
};

export default connect(mapStateToProps)(NotificationsPage);
