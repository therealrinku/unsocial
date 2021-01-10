import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ExplorePage from "../pages/ExplorePage";
import Homepage from "../pages/Homepage";
import PostView from "../pages/PostView";
import Profilepage from "../pages/Profilepage";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/explore" exact component={ExplorePage} />
        <Route path="/:username" exact component={Profilepage} />
        <Route path="/p/:post_id" exact component={PostView} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
