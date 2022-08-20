import { loginUser, getUserData } from "../../services/authServices";
import { getRecommendedUsers } from "../../services/userServices";
import userActionTypes from "./userActionTypes";
import { followUser, unfollowUser } from "../../services/profileServices";
import postActionTypes from "../post/postsActionTypes";
import profileActionTypes from "../profile/profileActionTypes";
import notificationPusher from "../../utilities/notificationPusher";

export const UPDATE_PROFILE_LOCALLY = (data) => (dispatch) => {
  dispatch({ type: userActionTypes.UPDATE_PROFILE_LOCALLY, payload: data });
};

export const UNFOLLOW_RECOMMENDED = (currentUserUid, unfollowingUserUid) => async (dispatch) => {
  try {
    dispatch({
      type: userActionTypes.UNFOLLOW_RECOMMENDED,
      payload: unfollowingUserUid,
    });
    await unfollowUser(unfollowingUserUid, currentUserUid);
  } catch (err) {
    dispatch({
      type: userActionTypes.SOMETHING_WENT_WRONG,
      payload: err.message,
    });
  }
};

export const FOLLOW_RECOMMENDED = (currentUserUid, FollowingUserUid) => async (dispatch) => {
  try {
    dispatch({
      type: userActionTypes.FOLLOW_RECOMMENDED,
      payload: FollowingUserUid,
    });
    await followUser(FollowingUserUid, currentUserUid);
    notificationPusher(FollowingUserUid);
  } catch (err) {
    dispatch({
      type: userActionTypes.SOMETHING_WENT_WRONG,
      payload: err.message,
    });
  }
};

export const GET_RECOMMENDED = (uid) => async (dispatch) => {
  try {
    dispatch({ type: userActionTypes.LOADING });
    const data = await getRecommendedUsers(uid);
    dispatch({ type: userActionTypes.SET_RECOMMENDED_USERS, payload: data });
  } catch (err) {
    dispatch({
      type: userActionTypes.SOMETHING_WENT_WRONG,
      payload: err.message,
    });
  }
};

export const GET_USER_DATA = () => async (dispatch) => {
  try {
    dispatch({ type: userActionTypes.LOADING });
    const data = await getUserData();
    dispatch({ type: userActionTypes.LOGIN, payload: data });
  } catch (err) {
    dispatch({
      type: userActionTypes.SOMETHING_WENT_WRONG,
      payload: err.message,
    });
  }
};

export const LOGIN = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: userActionTypes.LOADING });
    const response = await loginUser(username, password);
    if (typeof response === "object") {
      dispatch({ type: userActionTypes.LOGIN, payload: response });
    } else {
      throw new Error(response);
    }
  } catch (err) {
    dispatch({
      type: userActionTypes.SOMETHING_WENT_WRONG,
      payload: err.message,
    });
  }
};

export const LOGOUT = () => (dispatch) => {
  dispatch({ type: userActionTypes.LOGOUT });
  dispatch({ type: postActionTypes.CLEAR_POSTS });
  dispatch({ type: profileActionTypes.CLEAR_PROFILES });
};
