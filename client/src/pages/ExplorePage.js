import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Loader from "../components/Loader";
import PostsGrid from "../components/PostsGrid";
import * as PostsActions from "../redux/post/postsActions";

const ExplorePage = ({ loading, explorePosts, loadExplorePosts }) => {
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
        <div className="explore--page">
          <PostsGrid userPosts={explorePosts} />
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.posts.loading_explore_posts,
    explorePosts: state.posts.explore_posts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadExplorePosts: () => dispatch(PostsActions.LOAD_EXPLORE_POSTS()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExplorePage);
