import { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import firestore from "../../firebase/firestore";
import Logo from "../Logo";
import { FiHome, FiSearch, FiBell, FiUser,FiX } from "react-icons/fi";
import SearchUsers from "../SearchUsers";
import styles from "./Navbar.module.scss";

type NavbarTypes = {
  currentUsername: string;
  currentUserUid: string;
};

const Navbar = ({ currentUsername, currentUserUid }: NavbarTypes) => {
  const [notificationsCount, setNotificationsCount] = useState(0);
  const [showSearchBox, setShowSearchBox] = useState(false);

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
      {!showSearchBox ? (
        <div>
          <>
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

                  <button onClick={() => setShowSearchBox(true)}>
                    <FiSearch />
                  </button>

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
          </>
        </div>
      ) : (
        <section style={{display:"flex",justifyContent:"center",alignItems:"center",width:"300px"}}>
          <SearchUsers closeFunc={()=>setShowSearchBox(false)}/>
          <button className={styles.CloseButton} onClick={()=>setShowSearchBox(false)}><FiX/></button>
        </section>
      )}
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
