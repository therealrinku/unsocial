import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import { connect } from "react-redux";
import { useEffect } from "react";
import MobileNavbar from "../components/MobileNavbar";
import Loader from "../components/Loader";
import * as postsActions from "../redux/post/postsActions";
import * as userActions from "../redux/user/userActions";
import Recommended from "../components/Recommended";

const Homepage = ({
  currentUserUid,
  feed,
  GET_FEED,
  loading,
  recommendedUsers,
  GET_RECOMMENDED_USERS,
  feedLoaded,
}) => {
  useEffect(() => {
    if (!feedLoaded) {
      GET_FEED(currentUserUid);
    }
    if (feedLoaded && feed.length < 1) {
      GET_RECOMMENDED_USERS(currentUserUid);
    }
  }, [currentUserUid, feedLoaded]);

  return (
    <div className="homepage">
      {loading ? <Loader /> : null}
      <Sidebar />
      {feed.length > 0 && !loading ? (
        <Feed feed={feed} />
      ) : !loading && feedLoaded ? (
        <Recommended recommendedUsers={recommendedUsers} />
      ) : null}
      <MobileNavbar />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    feedLoaded: state.posts.feed_loaded,
    recommendedUsers: state.user.recommendedUsers,
    loading: state.posts.loading_feed,
    feed: state.posts.posts.filter((post) => post.infeed === true),
    currentUsername: state.user.currentUserData.username,
    currentUserUid: state.user.currentUserData.uid,
    currentUserProfileImage: state.user.currentUserData.profile_image_url,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GET_RECOMMENDED_USERS: (uid) => dispatch(userActions.GET_RECOMMENDED(uid)),
    GET_FEED: (user_uid) => dispatch(postsActions.GET_FEED(user_uid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
