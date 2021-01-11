import { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { FaGithub } from "react-icons/all";

const Auth = ({ location }) => {
  const [mode, setMode] = useState(location.pathname.slice(1));
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      className={mode !== "" ? "auth_page auth_page_full_occupy" : "auth_page"}
    >
      <div className="form_div">
        <p>Instaclone</p>
        <form>
          <input
            type="email"
            style={mode !== "signup" ? { display: "none" } : null}
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

          <button type="submit" className="signup_login_btn">
            {mode === "signup" ? "Signup" : "Login"}
          </button>
          <p style={mode !== "signup" ? { display: "none" } : null}>
            By signing up, you agree to our terms and policies.
          </p>
        </form>
      </div>

      <div className="bottom_div_">
        <p>
          {mode !== "signup"
            ? "Don't have an account yet?"
            : "Already have an account?"}
        </p>
        <NavLink to={mode !== "signup" ? "/signup" : "/login"}>
          {mode !== "signup" ? "Signup" : "Login"}
        </NavLink>
      </div>

      <a
        className="visit_me_section"
        href="https://github.com/rinkuuu/instaclone"
        target="_blank"
      >
        <FaGithub />
        <p>View on Github</p>
      </a>
    </div>
  );
};

export default withRouter(Auth);
