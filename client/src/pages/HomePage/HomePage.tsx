import Feed from "../../components/Feed";
import { connect } from "react-redux";
import { useEffect, Fragment } from "react";
import Loader from "../../components/Loader";
import * as postsActions from "../../redux/post/postsActions";
import { FiMeh } from "react-icons/fi";
import { useHistory } from "react-router";
import styles from "./HomePage.module.scss";

type HomePageTypes = {
  currentUserUid: string;
  feed: Array<object>;
  GET_FEED: Function;
  loading: boolean;
  feedLoaded: boolean;
  token: string;
};

const Homepage = ({ currentUserUid, feed, GET_FEED, loading, feedLoaded, token }: HomePageTypes) => {
  useEffect(() => {
    if (!feedLoaded) {
      GET_FEED(currentUserUid);
    }
  }, [currentUserUid, feedLoaded, token]);

  const history = useHistory();

  return (
    <Fragment>
      {loading && <Loader fullPage />}

      {!loading && (
        <div className={styles.Homepage}>
          {feed.length <= 0 ? (
            <div className={styles.meh}>
              <span>
                <FiMeh />
              </span>
              <p style={{ textAlign: "center" }}>
                Oops your feed is empty. <br />
                Follow people to start seeing their posts.
              </p>
              <button onClick={() => history.push("/explore")}>Find people to follow</button>
            </div>
          ) : (
            <Feed posts={feed} />
          )}
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state: any) => {
  return {
    feedLoaded: state.posts.feed_loaded,
    loading: state.posts.loading_feed,
    feed: state.posts.posts.filter((post: any) => post.infeed === true),
    currentUsername: state.user.currentUserData.username,
    currentUserUid: state.user.currentUserData.uid,
    currentUserProfileImage: state.user.currentUserData.profile_image_url,
    token: state.user.token,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    GET_FEED: (user_uid: any) => dispatch(postsActions.GET_FEED(user_uid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
