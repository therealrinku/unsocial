import { ReactEventHandler } from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import styles from "./Form.module.scss";

type Form = {
  username: string;
  onUsernameChange: Function;
  email?: string;
  onEmailChange: Function;
  password: string;
  onPasswordChange: Function;
  repeatPassword?: string;
  onRepeatPasswordChange: Function;
  formType: "Login" | "Register";
  errorMessage: String;
  onFormSubmit: ReactEventHandler;
  loading: boolean;
};

export default function Form({
  username,
  onUsernameChange,
  email,
  onEmailChange,
  password,
  onPasswordChange,
  repeatPassword,
  onRepeatPasswordChange,
  formType,
  errorMessage,
  onFormSubmit,
  loading,
}: Form) {
  return (
    <div className={styles.formWrapper}>
      <Logo />

      <form className={styles.form} onSubmit={onFormSubmit}>
        {formType === "Register" && (
          <>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
            />
          </>
        )}
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => onUsernameChange(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
        />
        {formType === "Register" && (
          <>
            <label>Repeat Password</label>
            <input
              type="password"
              value={repeatPassword}
              onChange={(e) => onRepeatPasswordChange(e.target.value)}
            />
          </>
        )}
        <button type="submit" disabled={loading}>
          {!loading ? (
            <>{formType === "Login" ? "Login" : "Register"}</>
          ) : (
            <span
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              ...
            </span>
          )}
        </button>
        {formType === "Register" && (
          <p style={{ fontSize: "13px", color: "gray" }}>
            By signing up, you agree to our terms and policies.
          </p>
        )}
        <p style={{ color: "red", fontSize: "13px" }}>{errorMessage}</p>
        <div>
          <p>
            {formType === "Register"
              ? "Already have an account?"
              : "Don't have an account?"}
          </p>
          <Link to={formType === "Register" ? "/login" : "/register"}>
            {formType === "Register" ? "Login" : "Register"}
          </Link>
        </div>
      </form>
    </div>
  );
}
