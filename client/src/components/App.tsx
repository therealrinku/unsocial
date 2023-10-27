import { useEffect, Fragment, useState } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "../pages/HomePage";
import PostViewPage from "../pages/PostViewPage";
import ProfilePage from "../pages/ProfilePage";
import LandingPage from "../pages/LandingPage";
import Layout from "./Layout";
import * as userActions from "../redux/user/userActions";
import * as postActions from "../redux/post/postsActions";
import Logo from "./Logo";
import SettingsPage from "../pages/SettingsPage";
import MessageView from "./MessageView";
import NotificationsPage from "../pages/NotificationsPage";
import ExplorePage from "../pages/ExplorePage";
import axios from "axios";
import Loader from "./Loader";
import Banner from "./Banner";
import server_url from "../server_url";

type AppTypes = {
  currentUsername: string;
  uploadingPost: boolean;
  GET_USER_DATA: Function;
  token: string;
  userDataLoaded: boolean;
  feedLoaded: boolean;
  ADD_MESSAGE: Function;
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
  const [isLoading, setIsLoading] = useState(true);

  const [banner, setBanner] = useState({});

  useEffect(() => {
    axios.get(`${server_url}/user/getBanner`).then((res) => {
      setBanner(res.data?.banner ?? {});
    });
  }, []);

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
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          if (error?.response?.status === 401) {
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
    }
  }, [token]);

  useEffect(() => {
    if (message) {
      setTimeout(() => ADD_MESSAGE(null), 3000);
    }
  }, [message]);

  useEffect(() => {
    //for fake loading animation for at least 2 sec
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return (
    <BrowserRouter>
      {(token && !userDataLoaded) || isLoading ? (
        <div className="bg-white flex flex-col w-full h-screen text-sm justify-center items-center">
          <Logo />
          <Loader />
        </div>
      ) : (
        <Fragment>
          {/* @ts-ignore */}
          {banner?.bannerText && (
            <Fragment>
              <Banner banner={banner} />
              <div className="mb-24"></div>
            </Fragment>
          )}

          {message ? <MessageView message={message} /> : null}

          <Switch>
            {!currentUsername && <Route path="/" exact component={LandingPage} />}
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
