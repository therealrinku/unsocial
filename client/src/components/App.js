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
import { SiInstagram } from "react-icons/all";
import PostButton from "../components/PostButton";
import overflowToggler from "../utilities/overflowToggler";
import AddPostModal from "../components/AddPostModal";
import Backdrop from "../components/Backdrop";
import EditProfilePage from "../pages/EditProfilePage";
import MessageViewer from "./MessageViewer";
import EditPasswordPage from "../pages/EditPasswordPage";

const App = ({
  currentUsername,
  uploadingPost,
  LOGIN_WITH_UID,
  token,
  userDataLoaded,
  feedLoaded,
}) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  //msg
  const [message, setMessage] = useState("");

  const toggleAddPostModal = () => {
    setShowAddPostModal((prev) => !prev);
    overflowToggler();
  };

  useEffect(() => {
    if (feedLoaded) {
      if (uploadingPost) {
        setMessage("Uploading your post. it may take couple of seconds.");
      } else {
        setMessage("Successfully uploaded a post.");
        setTimeout(() => {
          setMessage("");
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
          {showAddPostModal ? (
            <Fragment>
              <Backdrop show={showAddPostModal} toggle={toggleAddPostModal} />
              <AddPostModal
                toggle={toggleAddPostModal}
                selectedImage={selectedImage}
              />
            </Fragment>
          ) : null}

          <PostButton
            setSelectedImage={setSelectedImage}
            toggleAddPostModal={toggleAddPostModal}
          />

          {message.length > 0 ? <MessageViewer message={message} /> : null}

          <Switch>
            <Route
              path="/"
              exact
              component={currentUsername ? Homepage : Landingpage}
            />
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
    feedLoaded: state.posts.feed_loaded,
    uploadingPost: state.posts.uploadingPost,
    userDataLoaded: state.user.user_data_loaded,
    token: state.user.token,
    currentUsername: state.user.currentUserData.username,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    LOGIN_WITH_UID: (uid) => dispatch(userActions.LOGIN_WITH_UID(uid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
