import {
  followUser,
  getProfileData,
  getProfilePosts,
  getProfileSavedPosts,
  unfollowUser,
} from "../../services/profileServices";
import profileActionTypes from "./profileActionTypes";

export const UNFOLLOW = (unfollowing_user_uid, unfollower_user_uid) => async (
  dispatch
) => {
  console.log(unfollowing_user_uid);
  try {
    dispatch({
      type: profileActionTypes.UNFOLLOW,
      payload: unfollowing_user_uid,
    });
    await unfollowUser(unfollowing_user_uid, unfollower_user_uid);
  } catch (err) {
    dispatch({
      type: profileActionTypes.ERROR_IN_PROFILE,
      payload: err.message,
    });
  }
};

export const FOLLOW = (following_user_uid, follower_user_uid) => async (
  dispatch
) => {
  try {
    dispatch({
      type: profileActionTypes.FOLLOW,
      payload: following_user_uid,
    });
    await followUser(following_user_uid, follower_user_uid);
  } catch (err) {
    dispatch({
      type: profileActionTypes.ERROR_IN_PROFILE,
      payload: err.message,
    });
  }
};

export const GET_PROFILE_DATA = (profile_username, current_user_uid) => async (
  dispatch
) => {
  try {
    dispatch({ type: profileActionTypes.LOADING_PROFILE });
    const profileData = await getProfileData(
      profile_username,
      current_user_uid
    );
    const profilePosts = await getProfilePosts(
      current_user_uid,
      profileData[0]?.uid || null
    );

    const profileSavedPosts = await getProfileSavedPosts(current_user_uid);

    dispatch({
      type: profileActionTypes.SET_PROFILE,
      payload: {
        ...profileData[0],
        posts: profilePosts,
        savedPosts: profileSavedPosts,
      },
    });
  } catch (err) {
    dispatch({
      type: profileActionTypes.ERROR_IN_PROFILE,
      payload: err.message,
    });
  }
};
