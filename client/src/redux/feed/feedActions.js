import {
  deletePost,
  fetchFeed,
  getLikers,
  likePost,
  savePost,
  unlikePost,
  unsavePost,
  uploadPost,
} from "../../services/feedServices";
import feedActionTypes from "./feedActionTypes";

export const GET_FEED = (user_uid) => async (dispatch) => {
  try {
    dispatch({ type: feedActionTypes.GETTING_FEED });
    const feed = await fetchFeed(user_uid);
    dispatch({ type: feedActionTypes.SET_FEED, payload: feed });
  } catch (err) {
    dispatch({
      type: feedActionTypes.SOMETHING_WENT_WRONG,
      payload: err.message,
    });
  }
};

export const LIKE_POST = (post_uid, liker_uid) => async (dispatch) => {
  try {
    dispatch({
      type: feedActionTypes.LIKE_POST,
      payload: { post_uid },
    });
    await likePost(post_uid, liker_uid);
  } catch (err) {
    dispatch({
      type: feedActionTypes.SOMETHING_WENT_WRONG,
      payload: err.message,
    });
  }
};

export const UNLIKE_POST = (post_uid, unliker_uid) => async (dispatch) => {
  try {
    dispatch({
      type: feedActionTypes.UNLIKE_POST,
      payload: { post_uid },
    });
    await unlikePost(post_uid, unliker_uid);
  } catch (err) {
    dispatch({
      type: feedActionTypes.SOMETHING_WENT_WRONG,
      payload: err.message,
    });
  }
};

export const SAVE_POST = (post_uid, saver_username) => async (dispatch) => {
  try {
    dispatch({
      type: feedActionTypes.SAVE_POST,
      payload: { post_uid },
    });
    await savePost(post_uid, saver_username);
  } catch (err) {
    dispatch({
      type: feedActionTypes.SOMETHING_WENT_WRONG,
      payload: err.message,
    });
  }
};

export const UNSAVE_POST = (post_uid, unsaver_username) => async (dispatch) => {
  try {
    dispatch({
      type: feedActionTypes.UNSAVE_POST,
      payload: { post_uid },
    });
    await unsavePost(post_uid, unsaver_username);
  } catch (err) {
    dispatch({
      type: feedActionTypes.SOMETHING_WENT_WRONG,
      payload: err.message,
    });
  }
};

export const GET_LIKERS = (post_uid) => async (dispatch) => {
  try {
    dispatch({ type: feedActionTypes.GETTING_LIKERS });
    const likers = await getLikers(post_uid);
    dispatch({
      type: feedActionTypes.SET_POST_LIKERS,
      payload: { likers, post_uid },
    });
  } catch (err) {
    dispatch({
      type: feedActionTypes.SOMETHING_WENT_WRONG,
      payload: err.message,
    });
  }
};

export const DELETE_POST = (post_uid) => async (dispatch) => {
  try {
    await deletePost(post_uid);
    dispatch({ type: feedActionTypes.DELETE_POST, payload: { post_uid } });
  } catch (err) {
    dispatch({
      type: feedActionTypes.SOMETHING_WENT_WRONG,
      payload: err.message,
    });
  }
};

export const UPLOAD_POST = (post_data) => async (dispatch) => {
  try {
    const response = await uploadPost(post_data);
    console.log(response);
    //dispatch({ type: feedActionTypes.UPLOAD_POST, payload: {} });
  } catch (err) {
    dispatch({
      type: feedActionTypes.SOMETHING_WENT_WRONG,
      payload: err.message,
    });
  }
};

/* 


i_have_saved: false
liked_by_me:false
post_likes_count:0 
post_posted_date: 
post_status: 
poster_profileimage: 
poster_username: 
post_image: 

post_id: 
post_uid: 

*/
