import { loadPost } from "../../services/feedServices";
import postsActionsTypes from "./postsActionsTypes";

export const LOAD_POST = (post_id, current_user_uid) => async (dispatch) => {
  try {
    dispatch({ type: postsActionsTypes.LOADING_POST });
    const postData = await loadPost(post_id, current_user_uid);
    dispatch({ type: postsActionsTypes.SET_POST, payload: postData });
  } catch (err) {
    dispatch({
      type: postsActionsTypes.ERROR_LOADING_POST,
      payload: err.message,
    });
  }
};
