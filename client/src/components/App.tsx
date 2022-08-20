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
import ExplorePage from "../pages/ExplorePage";
import axios from "axios";

type AppTypes = {
  currentUsername: string;
  uploadingPost: boolean;
  GET_USER_DATA: any;
  token: string;
  userDataLoaded: boolean;
  feedLoaded: boolean;
  ADD_MESSAGE: any;
  message: string;
  GET_FEED: () => void;
  currentUserUid: string;
};

const App = ({
  currentUsername,
  uploadingPost,
  GET_USER_DATA,
  token,
  userDataLoaded,
  feedLoaded,
  ADD_MESSAGE,
  message,
  GET_FEED,
}: AppTypes) => {
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

    const messageClearTimeout = setTimeout(() => {
      ADD_MESSAGE(null);
    }, 4000);

    return () => {
      clearInterval(messageClearTimeout);
    };
  }, [uploadingPost]);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          localStorage.clear();
          window.location.reload();
        }
        return error;
      }
    );
    if (token) {
      GET_USER_DATA(token);
      if (!feedLoaded) {
        GET_FEED();
      }
    }

    console.log("hola i changed", token);
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
                <Route path="/explore" exact component={ExplorePage} />
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
    currentUserUid: state.user.currentUserData.uid,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    ADD_MESSAGE: (message: string) => dispatch(postActions.ADD_MESSAGE(message)),
    GET_USER_DATA: () => dispatch(userActions.GET_USER_DATA()),
    GET_FEED: () => dispatch(postActions.GET_FEED()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
