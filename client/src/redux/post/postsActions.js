import {
  deletePost,
  fetchFeed,
  getLikers,
  likePost,
  loadPost,
  savePost,
  unlikePost,
  unsavePost,
  uploadPost,
  getExplorePosts,
} from "../../services/postsServices";
import { addComment, getComments } from "../../services/commentServices";
import postActionTypes from "./postsActionTypes";

export const GET_COMMENTS = (post_uid, current_user_uid) => async (
  dispatch
) => {
  try {
    dispatch({ type: postActionTypes.GETTING_COMMENTS });
    const comments = await getComments(post_uid, current_user_uid);
    dispatch({
      type: postActionTypes.ADD_COMMENTS,
      payload: { post_uid: post_uid, comments: comments },
    });
  } catch (err) {
    dispatch({
      type: postActionTypes.SOMETHING_WENT_WRONG,
      payload: err.message,
    });
  }
};

export const ADD_COMMENT = (
  comment,
  commenter_uid,
  post_uid,
  post_owner_uid,
  posted_date,
  currentUserProfileImage,
  currentUsername
) => async (dispatch) => {
  try {
    dispatch({ type: postActionTypes.ADDING_COMMENT });
    const response = await addComment(
      comment,
      commenter_uid,
      post_uid,
      post_owner_uid,
      posted_date
    );
    dispatch({
      type: postActionTypes.ADD_COMMENT,
      payload: {
        post_uid:post_uid,
        comment_uid: response[0]?.comment_uid,
        poster_profile_image: currentUserProfileImage,
        poster_username: currentUsername,
        comment: comment,
        comment_likes_count: 0,
        comment_posted_date: posted_date,
      },
    });
  } catch (err) {
    dispatch({
      type: postActionTypes.SOMETHING_WENT_WRONG,
      payload: err.message,
    });
  }
};

export const LOAD_EXPLORE_POSTS = () => async (dispatch) => {
  try {
    dispatch({ type: postActionTypes.LOADING_EXPLORE_POSTS });
    const explorePosts = await getExplorePosts();
    dispatch({
      type: postActionTypes.ADD_EXPLORE_POSTS,
      payload: explorePosts,
    });
  } catch (err) {
    dispatch({
      type: postActionTypes.SOMETHING_WENT_WRONG,
      payload: err.message,
    });
  }
};

export const GET_POST = (post_id, current_user_uid) => async (dispatch) => {
  try {
    dispatch({ type: postActionTypes.GETTING_POST });
    const postData = await loadPost(post_id, current_user_uid);
    dispatch({ type: postActionTypes.ADD_POST, payload: postData[0] });
  } catch (err) {
    dispatch({
      type: postActionTypes.SOMETHING_WENT_WRONG,
      payload: err.message,
    });
  }
};

export const GET_FEED = (user_uid) => async (dispatch) => {
  try {
    dispatch({ type: postActionTypes.GETTING_FEED });
    const feed = await fetchFeed(user_uid);
    dispatch({ type: postActionTypes.SET_FEED, payload: feed });
  } catch (err) {
    dispatch({
      type: postActionTypes.SOMETHING_WENT_WRONG,
      payload: err.message,
    });
  }
};

export const LIKE_POST = (post_uid, liker_uid) => async (dispatch) => {
  try {
    dispatch({
      type: postActionTypes.LIKE_POST,
      payload: { post_uid },
    });
    await likePost(post_uid, liker_uid);
  } catch (err) {
    dispatch({
      type: postActionTypes.SOMETHING_WENT_WRONG,
      payload: err.message,
    });
  }
};

export const UNLIKE_POST = (post_uid, unliker_uid) => async (dispatch) => {
  try {
    dispatch({
      type: postActionTypes.UNLIKE_POST,
      payload: { post_uid },
    });
    await unlikePost(post_uid, unliker_uid);
  } catch (err) {
    dispatch({
      type: postActionTypes.SOMETHING_WENT_WRONG,
      payload: err.message,
    });
  }
};

export const SAVE_POST = (post_uid, saver_username) => async (dispatch) => {
  try {
    dispatch({
      type: postActionTypes.SAVE_POST,
      payload: { post_uid },
    });
    await savePost(post_uid, saver_username);
  } catch (err) {
    dispatch({
      type: postActionTypes.SOMETHING_WENT_WRONG,
      payload: err.message,
    });
  }
};

export const UNSAVE_POST = (post_uid, unsaver_username) => async (dispatch) => {
  try {
    dispatch({
      type: postActionTypes.UNSAVE_POST,
      payload: { post_uid },
    });
    await unsavePost(post_uid, unsaver_username);
  } catch (err) {
    dispatch({
      type: postActionTypes.SOMETHING_WENT_WRONG,
      payload: err.message,
    });
  }
};

export const GET_LIKERS = (post_uid) => async (dispatch) => {
  try {
    dispatch({ type: postActionTypes.GETTING_LIKERS });
    const likers = await getLikers(post_uid);
    dispatch({
      type: postActionTypes.SET_POST_LIKERS,
      payload: { likers, post_uid },
    });
  } catch (err) {
    dispatch({
      type: postActionTypes.SOMETHING_WENT_WRONG,
      payload: err.message,
    });
  }
};

export const DELETE_POST = (post_uid) => async (dispatch) => {
  try {
    await deletePost(post_uid);
    dispatch({ type: postActionTypes.DELETE_POST, payload: { post_uid } });
  } catch (err) {
    dispatch({
      type: postActionTypes.SOMETHING_WENT_WRONG,
      payload: err.message,
    });
  }
};

export const UPLOAD_POST = (post_data) => async (dispatch) => {
  try {
    const callMeAfterUploadDone = (post_image, post_uid, post_id) => {
      return dispatch({
        type: postActionTypes.UPLOAD_POST,
        payload: {
          post_image: post_image,
          post_uid: post_uid,
          post_id: post_id,
          i_have_saved: false,
          liked_by_me: false,
          post_likes_count: 0,
          post_posted_date: `${post_data.posted_date}`,
          post_status: post_data.status,
          poster_username: post_data.currentUsername,
          poster_profileimage: post_data.currentUserProfileImage,
        },
      });
    };
    await uploadPost(post_data, callMeAfterUploadDone);
  } catch (err) {
    dispatch({
      type: postActionTypes.SOMETHING_WENT_WRONG,
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
