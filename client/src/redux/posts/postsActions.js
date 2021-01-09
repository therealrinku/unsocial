import {
  likePost,
  loadPost,
  savePost,
  unlikePost,
  unsavePost,
} from "../../services/feedServices";
import postActionTypes from "./postsActionsTypes";
import postsActionsTypes from "./postsActionsTypes";

export const LIKE_POST = (post_uid, liker_uid) => async (dispatch) => {
  try {
    dispatch({
      type: postActionTypes.LIKE_P_POST,
      payload: { post_uid },
    });
    await likePost(post_uid, liker_uid);
  } catch (err) {
    dispatch({
      type: postActionTypes.ERROR_IN_POST,
      payload: err.message,
    });
  }
};

export const UNLIKE_POST = (post_uid, unliker_uid) => async (dispatch) => {
  try {
    dispatch({
      type: postActionTypes.UNLIKE_P_POST,
      payload: { post_uid },
    });
    await unlikePost(post_uid, unliker_uid);
  } catch (err) {
    dispatch({
      type: postActionTypes.ERROR_IN_POST,
      payload: err.message,
    });
  }
};

export const SAVE_POST = (post_uid, saver_username) => async (dispatch) => {
  try {
    dispatch({
      type: postActionTypes.SAVE_P_POST,
      payload: { post_uid },
    });
    await savePost(post_uid, saver_username);
  } catch (err) {
    dispatch({
      type: postActionTypes.ERROR_IN_POST,
      payload: err.message,
    });
  }
};

export const UNSAVE_POST = (post_uid, unsaver_username) => async (dispatch) => {
  try {
    dispatch({
      type: postActionTypes.UNSAVE_P_POST,
      payload: { post_uid },
    });
    await unsavePost(post_uid, unsaver_username);
  } catch (err) {
    dispatch({
      type: postActionTypes.ERROR_IN_POST,
      payload: err.message,
    });
  }
};

export const LOAD_POST = (post_id, current_user_uid) => async (dispatch) => {
  try {
    dispatch({ type: postsActionsTypes.LOADING_POST });
    const postData = await loadPost(post_id, current_user_uid);
    dispatch({ type: postsActionsTypes.SET_POST, payload: postData });
  } catch (err) {
    dispatch({
      type: postActionTypes.ERROR_IN_POST,
      payload: err.message,
    });
  }
};
