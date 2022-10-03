import axios from "axios";
import server_url from "../server_url";

export const getUserData = async () => {
  const response = await axios.get(server_url + "/user/getUserInfo");
  return response.data;
};

export const loginUser = async (username, password) => {
  const response = await axios.post(server_url + "/auth/login", { username, password });
  return response.data;
};

export const signupUser = async (email, username, password) => {
  const response = await axios.post(server_url + "/auth/signup", { email, username, password });
  return response.data;
};
