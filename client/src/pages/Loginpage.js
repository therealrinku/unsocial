import React, { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import * as userActions from "../redux/user/userActions";
import { connect } from "react-redux";

const Loginpage = ({ noFullPage, error, loading, currentUsername, LOGIN }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();
    LOGIN(username, password);
  };

  return (
    <div className="auth-page">
      <div>
        {currentUsername && <Redirect to="/" />}
        <p>Instaclone</p>
        <form onSubmit={login}>
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} autoFocus />
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button type="submit" disabled={loading}>
            {loading ? "Please Wait ...." : "Login"}
          </button>
        </form>
      </div>

      <div className="info">
        <p>Don't have an account yet?</p>
        <NavLink to="/signup">Signup</NavLink>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.user.error,
    loading: state.user.loading,
    currentUsername: state.user.currentUserData.username,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    LOGIN: (username, password) => dispatch(userActions.LOGIN(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Loginpage);
