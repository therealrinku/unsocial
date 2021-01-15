import axios from "axios";
import server_url from "../server_url";

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
    await axios.post(server_url + "/comment/addcomment", {
      comment,
      commenter_uid,
      post_uid,
      post_owner_uid,
      posted_date,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};
