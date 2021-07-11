import React, { useState } from "react";
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
      if (trimmed.username.length >= 5 && trimmed.username.length <= 25 && !trimmed.username.includes(" ")) {
        if (trimmed.password.length >= 8 && trimmed.password.length <= 30) {
          const response = await signupUser(email, username.trim().toLowerCase(), password);
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
    <div className="auth-page">
      <div>
        <p>Instaclone</p>
        <form onSubmit={SIGNUP}>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
          <label>Username</label>
          <input type="text" value={username.toLowerCase()} onChange={(e) => setUsername(e.target.value)} />
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button type="submit">Signup</button>
          <p style={{ fontSize: "14px", color: "gray", textAlign: "center" }}>
            By signing up, you agree to our terms and policies.
          </p>
        </form>
      </div>

      <div className="info">
        <p>Already have an account?</p>
        <NavLink to="/login">Login</NavLink>
      </div>
    </div>
  );
};

export default Signuppage;
