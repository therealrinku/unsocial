import Feed from "../components/Feed";
import Navbar from "../components/Navbar";
import { connect } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import PostButton from "../components/PostButton";
import overflowToggler from "../utilities/overflowToggler";
import AddPostModal from "../components/AddPostModal";
import Backdrop from "../components/Backdrop";
import MobileNavbar from "../components/MobileNavbar";
import Loader from "../components/Loader";
import * as postsActions from "../redux/post/postsActions";
import * as userActions from "../redux/user/userActions";
import Recommended from "../components/Recommended";

const Homepage = ({
  currentUsername,
  currentUserProfileImage,
  currentUserUid,
  feed,
  GET_FEED,
  UPLOAD_POST,
  loading,
  recommendedUsers,
  GET_RECOMMENDED_USERS,
  feedLoaded,
}) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [status, setStatus] = useState("");

  const uploadPost = () => {
    if (selectedImage) {
      toggleAddPostModal();
      UPLOAD_POST({
        owner_uid: currentUserUid,
        status: status,
        currentUsername: currentUsername,
        image: selectedImage,
        posted_date: new Date(),
        currentUserProfileImage: currentUserProfileImage,
      });
    }
  };

  const toggleAddPostModal = () => {
    setShowAddPostModal((prev) => !prev);
    overflowToggler();
  };

  useEffect(() => {
    if (!feedLoaded) {
      GET_FEED(currentUserUid);
    }
    if (feedLoaded && feed.length < 1) {
      console.log("s");
      GET_RECOMMENDED_USERS(currentUserUid);
    }
  }, [currentUserUid, feedLoaded]);

  return (
    <div className="homepage">
      {loading ? <Loader /> : null}
      {showAddPostModal ? (
        <Fragment>
          <Backdrop show={showAddPostModal} toggle={toggleAddPostModal} />
          <AddPostModal
            uploadPost={uploadPost}
            toggle={toggleAddPostModal}
            selectedImage={selectedImage}
            currentUserProfileImage={currentUserProfileImage}
            status={status}
            setStatus={setStatus}
          />
        </Fragment>
      ) : null}
      <PostButton
        setSelectedImage={setSelectedImage}
        toggleAddPostModal={toggleAddPostModal}
      />
      <Navbar />
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
    UPLOAD_POST: (post_data) => dispatch(postsActions.UPLOAD_POST(post_data)),
    GET_FEED: (user_uid) => dispatch(postsActions.GET_FEED(user_uid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
