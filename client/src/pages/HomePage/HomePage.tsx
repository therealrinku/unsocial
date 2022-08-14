import Feed from "../../components/Feed";
import { connect } from "react-redux";
import { Fragment } from "react";
import Loader from "../../components/Loader";
import { FiMeh } from "react-icons/fi";
import { useHistory } from "react-router";
import styles from "./HomePage.module.scss";

type HomePageTypes = {
  feed: Array<object>;
  loading: boolean;
};

const Homepage = ({ feed, loading }: HomePageTypes) => {
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
    loading: state.posts.loading_feed,
    feed: state.posts.posts.filter((post: any) => post.infeed === true),
  };
};

export default connect(mapStateToProps)(Homepage);
