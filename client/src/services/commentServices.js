import axios from "axios";
import server_url from "../server_url";

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
