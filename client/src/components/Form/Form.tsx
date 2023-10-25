import { Fragment, ReactEventHandler } from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

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

  return (
    <Fragment>
      <Logo />

      <form className="mt-12 flex flex-col gap-5" onSubmit={onFormSubmit}>
        {formType === "Register" && (
          <div className="flex flex-col gap-2">
            <label className="text-sm">Email</label>
            <input
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
            className="text-sm border px-2 py-[6px] focus:border-[#24B35A]"
            type="text"
            value={username}
            onChange={(e) => onUsernameChange(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm">Password</label>
          <input
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
              className="text-sm border px-2 py-[6px] focus:border-[#24B35A]"
              type="password"
              value={repeatPassword}
              onChange={(e) => onRepeatPasswordChange(e.target.value)}
            />
          </div>
        )}

        <button
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

        <p className="text-red-500 text-sm mb-3">{errorMessage}</p>
      </form>
    </Fragment>
  );
}
