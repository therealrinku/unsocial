import {
  getProfileData,
  getProfilePosts,
} from "../../services/profileServices";
import profileActionTypes from "./profileActionTypes";

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
    dispatch({
      type: profileActionTypes.SET_PROFILE,
      payload: { ...profileData[0], posts: profilePosts },
    });
  } catch (err) {
    dispatch({
      type: profileActionTypes.ERROR_IN_PROFILE,
      payload: err.message,
    });
  }
};
