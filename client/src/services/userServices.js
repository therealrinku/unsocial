import axios from "axios";
import server_url from "../server_url";

export const getSearchedUsers = async (query) => {
  try {
    return new Promise((resolve) => {
      return axios.get(server_url + `/user/search/${query}`).then((res) => {
        resolve(res.data);
      });
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(server_url + "/auth/login", {
      username,
      password,
    });
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const signupUser = async (email, username, password) => {
  try {
    const response = await axios.post(server_url + "/auth/signup", {
      email,
      username,
      password,
    });
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};
