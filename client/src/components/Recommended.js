import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as userActions from "../redux/user/userActions";
import { useEffect } from "react";
import { FiUserPlus, FiUserMinus } from "react-icons/all";

const Recommended = ({ recommendedUsers, currentUserUid, FOLLOW, UNFOLLOW, GET_RECOMMENDED_USERS }) => {
  useEffect(() => {
    if (recommendedUsers.length < 1 && currentUserUid) {
      GET_RECOMMENDED_USERS(currentUserUid);
    }
  }, [currentUserUid]);

  return (
    <div className="recommended" style={!currentUserUid ? { display: "none" } : null}>
      <p style={{ fontSize: "15px" }}>People you may like to follow</p>
      {recommendedUsers.length > 0 &&
        recommendedUsers.slice(3, 6).map((user) => {
          return (
            <div className="recommended--user" key={user.username}>
              <div>
                <img src={user.profile_image_url} alt="profile_image" />
                <NavLink to={`/user/${user.username}`}>{user.username}</NavLink>
              </div>

              <button
                className="follow--button"
                onClick={() => FOLLOW(currentUserUid, user.uid)}
                style={user.i_am_following ? { display: "none" } : null}
              >
                <FiUserPlus />
                <p>Follow</p>
              </button>
              <button
                className="unfollow--btn"
                style={!user.i_am_following ? { display: "none" } : { border: "solid 1px tomato" }}
                onClick={() => UNFOLLOW(currentUserUid, user.uid)}
              >
                <FiUserMinus />
                <p>Unfollow</p>
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
    recommendedUsers: state.user.recommendedUsers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GET_RECOMMENDED_USERS: (uid) => dispatch(userActions.GET_RECOMMENDED(uid)),
    FOLLOW: (follower_uid, following_uid) => dispatch(userActions.FOLLOW_RECOMMENDED(follower_uid, following_uid)),
    UNFOLLOW: (unfollower_uid, unfollowing_uid) =>
      dispatch(userActions.UNFOLLOW_RECOMMENDED(unfollower_uid, unfollowing_uid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recommended);
