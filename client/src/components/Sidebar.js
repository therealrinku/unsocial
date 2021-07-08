import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Activity from "./Activity";
import Backdrop from "./Backdrop";
import OverflowToggler from "../utilities/overflowToggler";
import firestore from "../firebase/firestore";
import { FiUsers, FiHome, FiBell, FiUser, FiCompass, FiSearch, FiUpload } from "react-icons/fi";
import { Tooltip } from "@material-ui/core";

const Sidebar = ({ currentUsername, currentUserProfileimage, currentUserUid, showSearchBarOnly }) => {
  const history = useHistory();
  const pathname = history.location.pathname;
  const [showActivity, setShowActivity] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(0);

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
          setNotificationsCount(data.length);
        });
    }
  }, []);

  const toggleActivity = () => {
    OverflowToggler();
    setShowActivity((prev) => !prev);
  };

  const navButtons = [
    { buttonIcon: <FiHome />, buttonTarget: "/", title: "Home" },
    { buttonIcon: <FiUpload />, buttonTarget: `/newPost`, title: "Add New Post" },
    { buttonIcon: <FiSearch />, buttonTarget: "/search", title: "Search" },
    { buttonIcon: <FiCompass />, buttonTarget: "/explore", title: "Explore" },
    { buttonIcon: <FiBell />, buttonTarget: "/notifications", title: "Notifications" },
    { buttonIcon: <FiUser />, buttonTarget: `/${currentUsername}`, title: "My Profile" },
  ];

  return (
    <Fragment>
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

      {/*showActivity ? (
        <Fragment>
          <Backdrop show={showActivity} toggle={toggleActivity} />
          <Activity currentUserUid={currentUserUid} toggle={toggleActivity} clear={() => setNotificationsCount(0)} />
        </Fragment>
      ) : null*/}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUserUid: state.user.currentUserData.uid,
    currentUsername: state.user.currentUserData.username,
    currentUserProfileimage: state.user.currentUserData.profile_image_url,
  };
};

export default connect(mapStateToProps)(Sidebar);
