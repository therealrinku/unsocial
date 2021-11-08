import { NavLink } from "react-router-dom";
import lazyLoadImage from "../../utilities/lazyLoadImage.js";
import ProfilePicPlaceholder from "../../assets/avatar.jpg";
import Modal from "../Modal";
import styles from "./UserListView.module.scss";

type UserListViewTypes = {
  title: string;
  loading: boolean;
  toggle: any;
  users: any;
};

const UserListView = ({ title, loading, toggle, users }: UserListViewTypes) => {
  return (
    <Modal title={title}>
      <div className={styles.UserListView}>
        {loading ? (
          <div style={{ textAlign: "center", fontSize: "14px" }}>
            Loading....
          </div>
        ) : (
          <div className={styles.UserList}>
            {users.length > 0 ? (
              users.map((user: any) => {
                return (
                  <div key={new Date().valueOf() * Math.random()}>
                    <img
                      alt="profile_img"
                      data-src={user.profile_image_url}
                      src={ProfilePicPlaceholder}
                      className="lazy-image"
                      onLoad={lazyLoadImage}
                    />
                    <NavLink to={`/user/${user.username}`} onClick={toggle}>
                      {user.username}
                    </NavLink>
                  </div>
                );
              })
            ) : (
              <p>No any {title} atm.</p>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default UserListView;
