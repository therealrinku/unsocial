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

const App = ({ currentUsername, LOGIN_WITH_UID, token, userDataLoaded }) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [showAddPostModal, setShowAddPostModal] = useState(false);

  const toggleAddPostModal = () => {
    setShowAddPostModal((prev) => !prev);
    overflowToggler();
  };

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
          </Switch>
        </Fragment>
      )}
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
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
