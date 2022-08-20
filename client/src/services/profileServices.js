import axios from "axios";
import server_url from "../server_url";

export const getFollowingList = async (username) => {
  try {
    const followings = await axios.get(server_url + `/user/followings/${username}`).then((res) => {
      return res.data;
    });
    return followings;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getFollowersList = async (username) => {
  try {
    const followers = await axios.get(server_url + `/user/followers/${username}`).then((res) => {
      return res.data;
    });
    return followers;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const followUser = async (following_user_uid, follower_user_uid) => {
  try {
    await axios.post(server_url + "/user/follow", {
      following_user_uid,
      follower_user_uid,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const unfollowUser = async (unfollowing_user_uid, unfollower_user_uid) => {
  try {
    await axios.post(server_url + "/user/unfollow", {
      unfollowing_user_uid,
      unfollower_user_uid,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getProfileSavedPosts = async (current_user_uid) => {
  try {
    const profileSavedPosts = await axios.get(server_url + `/post/savedPosts`).then((res) => {
      return res.data;
    });
    return profileSavedPosts;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getProfilePosts = async (profile_username) => {
  try {
    const profilePosts = await axios.get(server_url + `/post/posts/${profile_username}`).then((res) => {
      return res.data;
    });
    return profilePosts;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getProfileData = async (profile_username) => {
  try {
    const profileData = await axios.get(server_url + `/user/foreignProfileInfo/${profile_username}`).then((res) => {
      return res.data;
    });
    return profileData;
  } catch (err) {
    throw new Error(err.message);
  }
};
