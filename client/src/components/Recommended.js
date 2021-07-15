import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as userActions from "../redux/user/userActions";

const Recommended = ({
  recommendedUsers,
  currentUserUid,
  FOLLOW,
  UNFOLLOW,
}) => {
  return (
    <div className="recommended">
      <p>People you may like to follow</p>
      {recommendedUsers.map((user) => {
        return (
          <div className="recommended--user" key={user.username}>
            <div>
              <img src={user.profile_image_url} alt="profile_img" />
              <NavLink to={`/${user.username}`}>{user.username}</NavLink>
            </div>

            <button
              className="follow--button"
              onClick={() => FOLLOW(currentUserUid, user.uid)}
              style={user.i_am_following ? { display: "none" } : null}
            >
              Follow
            </button>
            <button
              className="unfollow--btn"
              style={!user.i_am_following ? { display: "none" } : null}
              onClick={() => UNFOLLOW(currentUserUid, user.uid)}
            >
              unfollow
            </button>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUserUid: state.user.currentUserData.uid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    FOLLOW: (follower_uid, following_uid) =>
      dispatch(userActions.FOLLOW_RECOMMENDED(follower_uid, following_uid)),
    UNFOLLOW: (unfollower_uid, unfollowing_uid) =>
      dispatch(
        userActions.UNFOLLOW_RECOMMENDED(unfollower_uid, unfollowing_uid)
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recommended);
