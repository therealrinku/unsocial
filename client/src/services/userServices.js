import axios from "axios";
import server_url from "../server_url";

export const updateUserData = async (username, email, bio) => {
  try {
    return new Promise((resolve) => {
      return axios
        .post(server_url + `/user/updateprofile`, { username, email, bio })
        .then((res) => {
          resolve(res.data);
        });
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getRecommendedUsers = async (uid) => {
  try {
    return new Promise((resolve) => {
      return axios
        .get(server_url + `/user/getrecommended/${uid}`)
        .then((res) => {
          resolve(res.data);
        });
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

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
