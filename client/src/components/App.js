import React from "react";
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

const App = ({ currentUsername, LOGIN_WITH_UID }) => {
  const token = localStorage.getItem("token");

  if (token) {
    LOGIN_WITH_UID(token);
  }

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUsername: state.user.currentUserData.username,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    LOGIN_WITH_UID: (uid) => dispatch(userActions.LOGIN_WITH_UID(uid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
