import axios from "axios";
import server_url from "../server_url";

export const getRecommendedUsers = async () => {
  try {
    return new Promise((resolve) => {
      return axios.get(server_url + `/user/getrecommended`).then((res) => {
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
