import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { NavLink } from "react-router-dom";
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
    <div className={!noFullPage ? `auth--page full--page` : "auth--page"}>
      <div>
        <p>Instaclone</p>
        <form onSubmit={login}>
          <input
            type="text"
            id="username"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />

          <input
            type="password"
            id="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            Login
          </button>

          <p>{error}</p>
        </form>
      </div>

      <div>
        <p>Don't have an account yet?</p>
        <NavLink to="/signup">Signup</NavLink>
      </div>

      <div>
        <FaGithub />
        <a href="https://github.com/therealrinku/instaclone" target="_blank">
          View on Github
        </a>
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
    LOGIN: (username, password) =>
      dispatch(userActions.LOGIN(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Loginpage);
