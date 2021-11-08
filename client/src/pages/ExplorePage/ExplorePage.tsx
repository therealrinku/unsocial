import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Loader from "../../components/Loader";
import PostsGrid from "../../components/PostsGrid";
import * as PostsActions from "../../redux/post/postsActions";
import SearchUsers from "../../components/SearchUsers";
import styles from "./ExplorePage.module.scss";

type ExplorePageTypes = {
  loading: boolean;
  explorePosts: any;
  loadExplorePosts: any;
};

const ExplorePage = ({
  loading,
  explorePosts,
  loadExplorePosts,
}: ExplorePageTypes) => {
  useEffect(() => {
    if (explorePosts.length <= 0) {
      loadExplorePosts();
    }
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.ExplorePage}>
          <SearchUsers />
          <PostsGrid userPosts={explorePosts} />
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state: any) => {
  return {
    loading: state.posts.loading_explore_posts,
    explorePosts: state.posts.explore_posts,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadExplorePosts: () => dispatch(PostsActions.LOAD_EXPLORE_POSTS()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExplorePage);
