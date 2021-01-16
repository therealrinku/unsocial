import axios from "axios";
import server_url from "../server_url";

export const deleteComment = async (comment_uid) => {
  try {
    await axios.post("/comment/delete", { comment_uid });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const likeComment = async (comment_uid, liker_uid) => {
  try {
    await axios.post(server_url + "/comment/like", { comment_uid, liker_uid });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const unlikeComment = async (comment_uid, unliker_uid) => {
  try {
    await axios.post(server_url + "/comment/unlike", {
      comment_uid,
      unliker_uid,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getComments = async (post_uid, current_user_uid) => {
  try {
    const comments = await axios
      .get(server_url + `/comment/getcomments/${post_uid}/${current_user_uid}`)
      .then((res) => res.data);
    return comments;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const addComment = async (
  comment,
  commenter_uid,
  post_uid,
  post_owner_uid,
  posted_date
) => {
  try {
    const response = await axios.post(server_url + "/comment/addcomment", {
      comment,
      commenter_uid,
      post_uid,
      post_owner_uid,
      posted_date,
    });
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};
