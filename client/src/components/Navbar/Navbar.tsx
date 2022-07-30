import { Fragment, useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import firestore from "../../firebase/firestore";
import Logo from "../Logo";
import { FiHome, FiSearch, FiBell, FiUser, FiX } from "react-icons/fi";
import SearchUsers from "../SearchUsers";
import lazyLoadImage from "../../utilities/lazyLoadImage.js";
import ProfilePicPlaceholder from "../../assets/avatar.jpg";
import * as userActions from "../../redux/user/userActions";
import ProfileOptionsModal from "../ProfileOptionsModal";
import styles from "./Navbar.module.scss";

type NavbarTypes = {
  currentUsername: string;
  currentUserUid: string;
  currentUserProfileImage: string;
  LOGOUT: Function;
};

function useOutsideAlerter(ref: any, toggle: any) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        toggle();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const Navbar = ({ currentUsername, currentUserUid, currentUserProfileImage, LOGOUT }: NavbarTypes) => {
  const [notificationsCount, setNotificationsCount] = useState(0);

  const [showSearchBox, setShowSearchBox] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);

  const history = useHistory();

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

  const Logout = () => {
    LOGOUT();
    history.push("/");
    localStorage.removeItem("token");
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => setShowProfileOptions(false));

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

                  <NavLink to="/explore" exact activeStyle={{ color: "tomato" }}>
                    <FiSearch />
                  </NavLink>

                  <NavLink to="/notifications" exact activeStyle={{ color: "tomato" }}>
                    <Badge badgeContent={notificationsCount} color="error" style={{ marginTop: "-8px" }}>
                      <FiBell />
                    </Badge>
                  </NavLink>

                  <div ref={wrapperRef} style={{ position: "relative" }}>
                    <button
                      onClick={() => setShowProfileOptions((prev) => !prev)}
                      className={styles.ProfileOptionsButton}
                    >
                      <img
                        data-src={currentUserProfileImage}
                        src={ProfilePicPlaceholder}
                        className={`lazy-image ${styles.ProfileImage}`}
                        onLoad={lazyLoadImage}
                        alt="profile image"
                      />
                    </button>

                    {showProfileOptions && (
                      <ProfileOptionsModal
                        toggle={() => setShowProfileOptions(false)}
                        LOGOUT={Logout}
                        currentUsername={currentUsername}
                      />
                    )}
                  </div>
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
        <section
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "300px",
          }}
        >
          <SearchUsers closeFunc={() => setShowSearchBox(false)} />
          <button className={styles.CloseButton} onClick={() => setShowSearchBox(false)}>
            <FiX />
          </button>
        </section>
      )}
    </nav>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentUserUid: state.user.currentUserData.uid,
    currentUsername: state.user.currentUserData.username,
    currentUserProfileImage: state.user.currentUserData.profile_image_url,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    LOGOUT: () => dispatch(userActions.LOGOUT()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
