import { NavLink } from "react-router-dom";
import lazyLoadImage from "../../utilities/lazyLoadImage.js";
import ProfilePicPlaceholder from "../../assets/avatar.jpg";
import Modal from "../Modal";

type UserListViewTypes = {
  title: string;
  loading: boolean;
  toggle: any;
  users: any;
};

const UserListView = ({ title, loading, toggle, users }: UserListViewTypes) => {
  return (
    <Modal title={title} onClose={toggle}>
      <div>
        {loading ? (
          <div>Loading....</div>
        ) : (
          <div className="flex flex-col gap-3">
            {users.length > 0 ? (
              users.map((user: any) => {
                return (
                  <div key={new Date().valueOf() * Math.random()} className="flex items-center gap-2">
                    <img
                      alt="profile_img"
                      data-src={user.profile_image_url}
                      src={ProfilePicPlaceholder}
                      className="lazy-image h-7 w-7 rounded-full"
                      onLoad={lazyLoadImage}
                    />
                    <NavLink className="hover:underline" to={`/user/${user.username}`} onClick={toggle}>
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
