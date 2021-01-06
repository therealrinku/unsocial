import axios from "axios";
import server_url from "../server_url";

export const getProfileSavedPosts = async (current_user_uid) => {
  try {
    const profileSavedPosts = await axios
      .get(server_url + `/post/savedposts/${current_user_uid}`)
      .then((res) => {
        return res.data;
      });
    return profileSavedPosts;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getProfilePosts = async (current_user_uid, profile_user_uid) => {
  try {
    const profilePosts = await axios
      .get(server_url + `/post/posts/${current_user_uid}/${profile_user_uid}`)
      .then((res) => {
        return res.data;
      });
    return profilePosts;
  } catch (err) {
    throw new Error(err.message);
  }
};

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
