import axios from "axios";
import server_url from "../server_url";

export const getProfileData = async (profile_username, current_user_uid) => {
  try {
    const profileData = await axios
      .get(
        server_url +
          `/user/visiteduserinfo/${profile_username}/${current_user_uid}`
      )
      .then((res) => {
        return res.data;
      });
    return profileData;
  } catch (err) {
    throw new Error(err.message);
  }
};
