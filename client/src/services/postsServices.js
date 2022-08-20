import axios from "axios";
import server_url from "../server_url";

import storage from "../firebase/storage";
import Compressor from "compressorjs";

export const getExplorePosts = async () => {
  try {
    const posts = await axios.get(server_url + `/post/explorePosts`).then((res) => {
      return res.data;
    });
    return posts;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const loadPost = async (post_id) => {
  try {
    const postData = await axios.get(server_url + `/post/getPost/${post_id}`).then((res) => {
      return res.data;
    });
    return postData;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const fetchFeed = async () => {
  try {
    const feed = await axios.get(server_url + "/post/feed").then((res) => {
      return res.data;
    });
    return feed;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const dislikePost = async (post_uid, post_owner_uid) => {
  try {
    await axios.post(server_url + "/post/dislike", {
      post_uid,
      post_owner_uid,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const undislikePost = async (post_uid) => {
  try {
    await axios.post(server_url + "/post/undislike", { post_uid });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const likePost = async (post_uid, post_owner_uid) => {
  try {
    await axios.post(server_url + "/post/like", {
      post_uid,
      post_owner_uid,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const unlikePost = async (post_uid) => {
  try {
    await axios.post(server_url + "/post/unlike", { post_uid });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const savePost = async (post_uid, saver_username) => {
  try {
    await axios.post(server_url + "/post/save", { post_uid, saver_username });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const unsavePost = async (post_uid, unsaver_username) => {
  try {
    await axios.post(server_url + "/post/unsave", {
      post_uid,
      unsaver_username,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getLikers = async (post_uid) => {
  try {
    const likers = await axios.get(server_url + `/post/likers/${post_uid}`).then((res) => res.data);
    return likers;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const deletePost = async (post_uid) => {
  try {
    await axios.post(server_url + "/post/delete", { post_uid });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const uploadPost = async (data, callMeAfterUploadDone) => {
  try {
    new Compressor(data.image, {
      quality: 0.6,
      success(result) {
        const uploadedImage = storage.ref(`/posts/${data.owner_uid}/${result.name}`).put(result);
        uploadedImage.on(
          "state_changed",
          (snapshot) => {},
          (err) => console.log(err),
          () => {
            storage
              .ref(`/posts/${data.owner_uid}`)
              .child(result.name)
              .getDownloadURL()
              .then((image_url) => {
                axios
                  .post(server_url + "/post/upload/new", {
                    owner_uid: data.owner_uid,
                    image_url: image_url,
                    status: data.status,
                  })
                  .then((res) => {
                    callMeAfterUploadDone(image_url, res.data[0].post_uid, res.data[0].post_id);
                  });
              });
          }
        );
      },
    });
  } catch (err) {
    throw new Error(err.message);
  }
};
