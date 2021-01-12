import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Login = ({ noFullPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={!noFullPage ? `auth--page full--page` : "auth--page"}>
      <div>
        <p>Instaclone</p>
        <form>
          <input
            type="text"
            id="username"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            id="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="signup_login_btn">
            Login
          </button>
        </form>
      </div>

      <div>
        <p>Don't have an account yet?</p>
        <NavLink to="/signup">Signup</NavLink>
      </div>

      <div>
        <FaGithub />
        <a href="https://github.com/rinkuuu/instaclone" target="_blank">
          View on Github
        </a>
      </div>
    </div>
  );
};

export default Login;
