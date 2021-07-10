import Feed from "../components/Feed";
import { connect } from "react-redux";
import { useEffect } from "react";
import Loader from "../components/Loader";
import * as postsActions from "../redux/post/postsActions";

const Homepage = ({ currentUserUid, feed, GET_FEED, loading, feedLoaded }) => {
  useEffect(() => {
    if (!feedLoaded) {
      GET_FEED(currentUserUid);
    }
  }, [currentUserUid, feedLoaded]);

  return (
    <div style={{ paddingBottom: "30px" }}>
      {loading ? <Loader /> : null}
      {feed.length > 0 && !loading ? <Feed feed={feed} /> : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    feedLoaded: state.posts.feed_loaded,
    loading: state.posts.loading_feed,
    feed: state.posts.posts.filter((post) => post.infeed === true),
    currentUsername: state.user.currentUserData.username,
    currentUserUid: state.user.currentUserData.uid,
    currentUserProfileImage: state.user.currentUserData.profile_image_url,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GET_FEED: (user_uid) => dispatch(postsActions.GET_FEED(user_uid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
