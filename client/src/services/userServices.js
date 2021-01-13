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
