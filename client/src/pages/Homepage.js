import Feed from "../components/Feed";
import Navbar from "../components/Navbar";
import * as feedActions from "../redux/feed/feedActions";
import { connect } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import PostButton from "../components/PostButton";
import overflowToggler from "../utilities/overflowToggler";
import AddPostModal from "../components/AddPostModal";
import Backdrop from "../components/Backdrop";
import MobileNavbar from "../components/MobileNavbar";

const Homepage = ({
  currentUserProfileImage,
  currentUserUid,
  feed,
  GET_FEED,
  UPLOAD_POST,
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
        image: selectedImage,
        posted_date: new Date(),
      });
    }
  };

  const toggleAddPostModal = () => {
    setShowAddPostModal((prev) => !prev);
    overflowToggler();
  };

  useEffect(() => {
    if (feed.length <= 0) {
      GET_FEED(currentUserUid);
    }
  }, [currentUserUid]);

  return (
    <div className="homepage">
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
      <Feed feed={feed} />
      <MobileNavbar />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    feed: state.feed.posts,
    currentUserUid: state.user.currentUserData.uid,
    currentUserProfileImage: state.user.currentUserData.profile_image_url,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    UPLOAD_POST: (post_data) => dispatch(feedActions.UPLOAD_POST(post_data)),
    GET_FEED: (user_uid) => dispatch(feedActions.GET_FEED(user_uid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
