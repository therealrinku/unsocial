import { useState, useEffect, FormEvent } from "react";
import Form from "../../components/Form";
import * as userActions from "../../redux/user/userActions";
import { connect } from "react-redux";
import { useHistory } from "react-router";

type LoginPageProps = {
  error: string;
  loading: boolean;
  currentUsername: String;
  LOGIN: Function;
};

const Loginpage = ({
  error,
  loading,
  currentUsername,
  LOGIN,
}: LoginPageProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const login = (e: FormEvent) => {
    e.preventDefault();
    LOGIN(username, password);
  };

  useEffect(() => {
    if (currentUsername) {
      history.push("/");
    }
  }, [currentUsername]);

  return (
    <Form
      username={username}
      onUsernameChange={setUsername}
      password={password}
      onPasswordChange={setPassword}
      formType="Login"
      errorMessage={error}
      onFormSubmit={login}
      onEmailChange={() => {}}
      onRepeatPasswordChange={() => {}}
      loading={loading}
    />
  );
};

const mapStateToProps = (state: any) => {
  return {
    error: state.user.error,
    loading: state.user.loading,
    currentUsername: state.user.currentUserData.username,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    LOGIN: (username: string, password: string) =>
      dispatch(userActions.LOGIN(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Loginpage);
