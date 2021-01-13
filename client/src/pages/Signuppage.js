import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { signupUser } from "../services/authServices";
import { useHistory } from "react-router-dom";

const Signuppage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const history = useHistory();

  const SIGNUP = async (e) => {
    e.preventDefault();

    const trimmed = {
      email: email.trim(),
      username: username.trim(),
      password: password.trim(),
    };

    if (
      trimmed.email !== "" &&
      trimmed.email.length >= 8 &&
      trimmed.email.length <= 40 &&
      trimmed.email.includes("@") &&
      trimmed.email.includes(".com")
    ) {
      if (
        trimmed.username.length >= 5 &&
        trimmed.username.length <= 25 &&
        !trimmed.username.includes(" ")
      ) {
        if (trimmed.password.length >= 8 && trimmed.password.length <= 30) {
          const response = await signupUser(email, username, password);
          if (response !== "success") {
            setError(response);
          } else {
            history.push("/login");
          }
        } else {
          setError("Password must be between 8 and 30 characters.");
        }
      } else {
        setError("Username must be spaceless between 5 and 25 characters.");
      }
    } else {
      setError("Please enter a valid email address.");
    }
  };

  return (
    <div className="auth--page">
      <div>
        <p>Instaclone</p>
        <form onSubmit={SIGNUP}>
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
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
          <p style={{ color: "red" }}>{error}</p>
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
