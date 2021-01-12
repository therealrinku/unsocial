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

const App = ({ currentUsername }) => {
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

export default connect(mapStateToProps)(App);
