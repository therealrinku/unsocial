import { useHistory } from "react-router-dom";

const LoginNeededPrompt = ({ toggle, profilePage }) => {
  const history = useHistory();

  const goToLoginPage = () => {
    toggle();
    history.push("/login");
  };

  return (
    <div className="login--needed-prompt">
      <p>
        You need to login to interact with the{" "}
        {profilePage ? "profile" : "post"}.
      </p>
      <button onClick={goToLoginPage} className="login--btn">
        Login
      </button>
      <button onClick={toggle}>Not interested</button>
    </div>
  );
};

export default LoginNeededPrompt;
