import React, { useEffect } from "react";
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

const App = ({ loading, currentUsername, LOGIN_WITH_UID, token }) => {
  console.log(token);
  useEffect(() => {
    if (token) {
      LOGIN_WITH_UID(token);
    }
  }, [token]);

  return (
    <BrowserRouter>
      {loading ? (
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
        <Switch>
          <Route
            path="/"
            exact
            component={currentUsername ? Homepage : Landingpage}
          />
          <Route path="/login" exact component={Loginpage} />
          <Route path="/signup" exact component={Signuppage} />
          <Route path="/explore" exact component={ExplorePage} />
          <Route path="/:username" exact component={Profilepage} />
          <Route path="/p/:post_id" exact component={PostView} />
        </Switch>
      )}
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    loading: state.user.loading,
    currentUsername: state.user.currentUserData.username,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    LOGIN_WITH_UID: (uid) => dispatch(userActions.LOGIN_WITH_UID(uid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
