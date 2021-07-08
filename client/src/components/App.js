import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ExplorePage from "../pages/ExplorePage";
import Homepage from "../pages/Homepage";
import PostView from "../pages/PostView";
import Profilepage from "../pages/Profilepage";
import Landingpage from "../pages/Landingpage";
import Loginpage from "../pages/Loginpage";
import Signuppage from "../pages/Signuppage";
import * as userActions from "../redux/user/userActions";
import * as postActions from "../redux/post/postsActions";
import { SiInstagram } from "react-icons/all";
import PostButton from "../components/PostButton";
import overflowToggler from "../utilities/overflowToggler";
import AddPostModal from "../components/AddPostModal";
import Backdrop from "../components/Backdrop";
import EditProfilePage from "../pages/EditProfilePage";
import MessageViewer from "./MessageViewer";
import EditPasswordPage from "../pages/EditPasswordPage";
import Topbar from "./Topbar";

const App = ({
  currentUsername,
  uploadingPost,
  LOGIN_WITH_UID,
  token,
  userDataLoaded,
  feedLoaded,
  ADD_MESSAGE,
  message,
}) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  //msg

  const toggleAddPostModal = () => {
    setShowAddPostModal((prev) => !prev);
    overflowToggler();
  };

  useEffect(() => {
    if (feedLoaded) {
      if (uploadingPost) {
        ADD_MESSAGE("Uploading your post. it may take couple of seconds.");
      } else {
        ADD_MESSAGE("Successfully uploaded a post.");
        setTimeout(() => {
          ADD_MESSAGE(null);
        }, 3000);
      }
    }
  }, [uploadingPost]);

  useEffect(() => {
    if (token) {
      LOGIN_WITH_UID(token);
    }
  }, [token]);

  return (
    <BrowserRouter>
      {token && !userDataLoaded ? (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "45px",
            color: "rgba(0,0,0,0.5)",
          }}
        >
          <SiInstagram />
        </div>
      ) : (
        <Fragment>
          <Topbar />

          {showAddPostModal ? (
            <Fragment>
              <Backdrop show={showAddPostModal} toggle={toggleAddPostModal} />
              <AddPostModal toggle={toggleAddPostModal} selectedImage={selectedImage} />
            </Fragment>
          ) : null}

          {message ? <MessageViewer message={message} /> : null}

          <PostButton setSelectedImage={setSelectedImage} toggleAddPostModal={toggleAddPostModal} />

          <Switch>
            <Route path="/" exact component={currentUsername ? Homepage : Landingpage} />
            <Route path="/edit/profile" exact component={EditProfilePage} />
            <Route path="/login" exact component={Loginpage} />
            <Route path="/signup" exact component={Signuppage} />
            <Route path="/explore" exact component={ExplorePage} />
            <Route path="/:username" exact component={Profilepage} />
            <Route path="/p/:post_id" exact component={PostView} />
            <Route path="/edit/password" exact component={EditPasswordPage} />
          </Switch>
        </Fragment>
      )}
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    message: state.posts.message,
    feedLoaded: state.posts.feed_loaded,
    uploadingPost: state.posts.uploadingPost,
    userDataLoaded: state.user.user_data_loaded,
    token: state.user.token,
    currentUsername: state.user.currentUserData.username,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ADD_MESSAGE: (message) => dispatch(postActions.ADD_MESSAGE(message)),
    LOGIN_WITH_UID: (uid) => dispatch(userActions.LOGIN_WITH_UID(uid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
