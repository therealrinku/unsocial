import axios from "axios";
import server_url from "../server_url";

export const getUserData = async (uid) => {
  try {
    const response = await axios.get(server_url + "/user/getUserInfo").then((res) => res.data);
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await axios
      .post(server_url + "/auth/login", {
        username,
        password,
      })
      .then((res) => res.data);
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const signupUser = async (email, username, password) => {
  try {
    const response = await axios
      .post(server_url + "/auth/signup", {
        email,
        username,
        password,
      })
      .then((res) => res.data);
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};
