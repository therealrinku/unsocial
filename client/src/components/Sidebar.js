import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import firestore from "../firebase/firestore";
import { FiHome, FiBell, FiUser, FiSearch, FiUpload } from "react-icons/fi";
import { Tooltip, Badge } from "@material-ui/core";

const Sidebar = ({ currentUsername, currentUserUid }) => {
  const history = useHistory();
  const pathname = history.location.pathname;
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    if (currentUserUid) {
      firestore
        .collection(currentUserUid)
        .doc("notifications")
        .onSnapshot((doc) => {
          const data = [];
          for (let e in doc.data()) {
            data.push(e);
          }
          setNotificationCount(data.length);
        });
    }
  }, []);

  const navButtons = [
    { buttonIcon: <FiHome />, buttonTarget: "/", title: "Home" },
    { buttonIcon: <FiSearch />, buttonTarget: "/explore", title: "Explore" },
  ];

  if (currentUserUid) {
    navButtons.push(
      { buttonIcon: <FiUpload />, buttonTarget: `/newPost`, title: "Add New Post" },
      {
        buttonIcon: (
          <Badge badgeContent={notificationCount} color="primary">
            <FiBell />
          </Badge>
        ),
        buttonTarget: "/notifications",
        title: "Notifications",
      },
      { buttonIcon: <FiUser />, buttonTarget: `/user/${currentUsername}`, title: "My Profile" }
    );
  }

  return (
    <nav className="sidebar">
      <div>
        {navButtons.map((button, i) => {
          return (
            <Tooltip title={<p className="tooltipText">{button.title}</p>} arrow key={i} placement="left">
              <button
                onClick={() => history.push(button.buttonTarget)}
                className={pathname === button.buttonTarget ? "activeButton" : null}
              >
                {button.buttonIcon}
              </button>
            </Tooltip>
          );
        })}
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUserUid: state.user.currentUserData.uid,
    currentUsername: state.user.currentUserData.username,
  };
};

export default connect(mapStateToProps)(Sidebar);
