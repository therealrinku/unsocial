import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "../pages/HomePage";
import PostViewPage from "../pages/PostViewPage";
import ProfilePage from "../pages/ProfilePage";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Layout from "./Layout";
import * as userActions from "../redux/user/userActions";
import * as postActions from "../redux/post/postsActions";
import Logo from "./Logo";
import SettingsPage from "../pages/SettingsPage";
import MessageView from "./MessageView";
import NotificationsPage from "../pages/NotificationsPage";

type AppTypes = {
  currentUsername: string;
  uploadingPost: boolean;
  LOGIN_WITH_UID: any;
  token: string;
  userDataLoaded: boolean;
  feedLoaded: boolean;
  ADD_MESSAGE: any;
  message: string;
};

const App = ({
  currentUsername,
  uploadingPost,
  LOGIN_WITH_UID,
  token,
  userDataLoaded,
  feedLoaded,
  ADD_MESSAGE,
  message,
}: AppTypes) => {
  useEffect(() => {
    if (feedLoaded) {
      if (uploadingPost) {
        ADD_MESSAGE("Uploading your post. it may take couple of seconds.");
      } else {
        ADD_MESSAGE("Successfully uploaded a post.");
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
            fontSize: "75px",
          }}
        >
          <Logo />
        </div>
      ) : (
        <Fragment>
          {message ? <MessageView message={message} /> : null}

          <Switch>
            {!currentUsername && <Route path="/" exact component={LandingPage} />}
            <Route path="/login" exact component={LoginPage} />
            <Route path="/register" exact component={RegisterPage} />

            <Layout>
              <>
                {currentUsername && <Route path="/" exact component={HomePage} />}
                <Route path="/settings" exact component={SettingsPage} />
                <Route path="/user/:username" exact component={ProfilePage} />
                <Route path="/p/:post_id" exact component={PostViewPage} />
                <Route path="/notifications" exact component={NotificationsPage} />
              </>
            </Layout>
          </Switch>
        </Fragment>
      )}
    </BrowserRouter>
  );
};

const mapStateToProps = (state: any) => {
  return {
    message: state.posts.message,
    feedLoaded: state.posts.feed_loaded,
    uploadingPost: state.posts.uploadingPost,
    userDataLoaded: state.user.user_data_loaded,
    token: state.user.token,
    currentUsername: state.user.currentUserData.username,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    ADD_MESSAGE: (message: string) => dispatch(postActions.ADD_MESSAGE(message)),
    LOGIN_WITH_UID: (uid: string) => dispatch(userActions.LOGIN_WITH_UID(uid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
