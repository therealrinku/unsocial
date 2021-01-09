import {
  likePost,
  loadPost,
  savePost,
  unlikePost,
  unsavePost,
} from "../../services/feedServices";
import postActionTypes from "./postsActionsTypes";
import feedActionTypes from "../feed/feedActionTypes";

export const LIKE_POST = (post_uid, liker_uid, post_exists_in_feed) => async (
  dispatch
) => {
  try {
    dispatch({
      type: postActionTypes.LIKE_P_POST,
      payload: { post_uid },
    });

    if (post_exists_in_feed) {
      dispatch({
        type: feedActionTypes.LIKE_POST,
        payload: { post_uid },
      });
    }

    await likePost(post_uid, liker_uid);
  } catch (err) {
    dispatch({
      type: postActionTypes.ERROR_IN_POST,
      payload: err.message,
    });
  }
};

export const UNLIKE_POST = (
  post_uid,
  unliker_uid,
  post_exists_in_feed
) => async (dispatch) => {
  try {
    dispatch({
      type: postActionTypes.UNLIKE_P_POST,
      payload: { post_uid },
    });

    if (post_exists_in_feed) {
      dispatch({
        type: feedActionTypes.UNLIKE_POST,
        payload: { post_uid },
      });
    }

    await unlikePost(post_uid, unliker_uid);
  } catch (err) {
    dispatch({
      type: postActionTypes.ERROR_IN_POST,
      payload: err.message,
    });
  }
};

export const SAVE_POST = (
  post_uid,
  saver_username,
  post_exists_in_feed
) => async (dispatch) => {
  try {
    dispatch({
      type: postActionTypes.SAVE_P_POST,
      payload: { post_uid },
    });

    if (post_exists_in_feed) {
      dispatch({
        type: feedActionTypes.SAVE_POST,
        payload: { post_uid },
      });
    }

    await savePost(post_uid, saver_username);
  } catch (err) {
    dispatch({
      type: postActionTypes.ERROR_IN_POST,
      payload: err.message,
    });
  }
};

export const UNSAVE_POST = (
  post_uid,
  unsaver_username,
  post_exists_in_feed
) => async (dispatch) => {
  try {
    dispatch({
      type: postActionTypes.UNSAVE_P_POST,
      payload: { post_uid },
    });

    if (post_exists_in_feed) {
      dispatch({
        type: feedActionTypes.UNSAVE_POST,
        payload: { post_uid },
      });
    }

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
    dispatch({ type: postActionTypes.LOADING_POST });
    const postData = await loadPost(post_id, current_user_uid);
    dispatch({ type: postActionTypes.SET_POST, payload: postData });
  } catch (err) {
    dispatch({
      type: postActionTypes.ERROR_IN_POST,
      payload: err.message,
    });
  }
};
