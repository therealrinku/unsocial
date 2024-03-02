import { Fragment, ReactEventHandler } from "react";
import Logo from "../Logo";
import * as postActions from "../../redux/post/postsActions";
import { connect } from "react-redux";

type Form = {
  username: string;
  onUsernameChange: Function;
  email?: string;
  onEmailChange: Function;
  password: string;
  ADD_MESSAGE: Function;
  onPasswordChange: Function;
  repeatPassword?: string;
  onRepeatPasswordChange: Function;
  formType: "Login" | "Register";
  errorMessage: String;
  onFormSubmit: ReactEventHandler;
  loading: boolean;
};

function Form({
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
  ADD_MESSAGE,
}: Form) {
  const shouldSubmitButtonBeDisabled = () => {
    if (loading) return true;
    if (formType === "Login") {
      if (username.trim().length < 5 || password.trim().length < 5) {
        return true;
      }
    }

    if (formType === "Register") {
      if (username.trim().length < 5 || password.trim().length < 5 || (email || "emaild").trim().length < 5) {
        return true;
      }
    }

    return false;
  };

  if (errorMessage) {
    ADD_MESSAGE(errorMessage);
  }

  return (
    <Fragment>
      <Logo />

      <form className="mt-12 flex flex-col gap-5" onSubmit={onFormSubmit}>
        {formType === "Register" && (
          <div className="flex flex-col gap-2">
            <label className="text-sm">Email</label>
            <input
              data-testid="email"
              className="text-sm border px-2 py-[6px] focus:border-[#24B35A]"
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label className="text-sm">Username</label>
          <input
            data-testid="username"
            className="text-sm border px-2 py-[6px] focus:border-[#24B35A]"
            type="text"
            value={username}
            onChange={(e) => onUsernameChange(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm">Password</label>
          <input
            data-testid="password"
            className="text-sm border px-2 py-[6px] focus:border-[#24B35A]"
            type="password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
          />
        </div>

        {formType === "Register" && (
          <div className="flex flex-col gap-2">
            <label className="text-sm">Repeat Password</label>
            <input
              data-testid="repeat-password"
              className="text-sm border px-2 py-[6px] focus:border-[#24B35A]"
              type="password"
              value={repeatPassword}
              onChange={(e) => onRepeatPasswordChange(e.target.value)}
            />
          </div>
        )}

        <button
          role={formType === "Login" ? "login-btn" : "signup-btn"}
          className="text-sm mt-3 bg-[#018e23] text-white py-[6px] disabled:cursor-default"
          type="submit"
          disabled={shouldSubmitButtonBeDisabled()}
        >
          {!loading ? (
            <>{formType === "Login" ? "Login" : "Register"}</>
          ) : (
            <span className="flex justify-center font-bold">...</span>
          )}
        </button>
      </form>
    </Fragment>
  );
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    ADD_MESSAGE: (message: string) => dispatch(postActions.ADD_MESSAGE(message)),
  };
};

export default connect(null, mapDispatchToProps)(Form);
