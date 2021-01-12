import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Signuppage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="auth--page">
      <div>
        <p>Instaclone</p>
        <form>
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
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

          <button type="submit">Signup</button>
          <p>By signing up, you agree to our terms and policies.</p>
        </form>
      </div>

      <div>
        <p>Already have an account yet?</p>
        <NavLink to="/login">Login</NavLink>
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

export default Signuppage;
