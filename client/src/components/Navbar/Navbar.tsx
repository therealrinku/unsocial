import { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import firestore from "../../firebase/firestore";
import Logo from "../Logo";
import { FiHome, FiSearch, FiBell, FiUser } from "react-icons/fi";
import styles from "./Navbar.module.scss";

type NavbarTypes = {
  currentUsername: string;
  currentUserUid: string;
};

const Navbar = ({ currentUsername, currentUserUid }: NavbarTypes) => {
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

  return (
    <nav className={styles.navbar}>
      <div>
        <ul>
          <NavLink to="/">
            <Logo />
          </NavLink>
        </ul>

        <ul>
          {currentUsername && (
            <>
              <NavLink to="/" exact activeStyle={{ color: "tomato" }}>
                <FiHome />
              </NavLink>

              <NavLink to="/explore" exact activeStyle={{ color: "tomato" }}>
                <FiSearch />
              </NavLink>

              <NavLink
                to="/notifications"
                exact
                activeStyle={{ color: "tomato" }}
              >
                <Badge
                  badgeContent={notificationsCount}
                  color="error"
                  style={{ marginTop: "-8px" }}
                >
                  <FiBell />
                </Badge>
              </NavLink>

              <NavLink
                to={`/user/${currentUsername}`}
                exact
                activeStyle={{ color: "tomato" }}
              >
                <FiUser />
              </NavLink>
            </>
          )}

          {!currentUsername && (
            <NavLink to="/login" exact>
              <FiUser />
            </NavLink>
          )}
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentUserUid: state.user.currentUserData.uid,
    currentUsername: state.user.currentUserData.username,
  };
};

export default connect(mapStateToProps)(Navbar);
