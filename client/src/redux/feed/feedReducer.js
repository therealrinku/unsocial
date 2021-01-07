import feedActionTypes from "./feedActionTypes";

const initial_state = {
  posts: [],
  error: null,
  loading_feed: false,
  loading_likers: false,
};

const feedReducer = (state = initial_state, action) => {
  switch (action.type) {
    case feedActionTypes.LIKE_POST:
      const postsCopyA = [...state.posts];
      const indexToUpdateA = postsCopyA.findIndex(
        (post) => post.post_uid === action.payload.post_uid
      );
      postsCopyA[indexToUpdateA].liked_by_me = true;
      postsCopyA[indexToUpdateA].post_likes_count =
        postsCopyA[indexToUpdateA].post_likes_count + 1;

      return {
        ...state,
        posts: postsCopyA,
      };

    case feedActionTypes.UNLIKE_POST:
      const postsCopyB = [...state.posts];
      const indexToUpdateB = postsCopyB.findIndex(
        (post) => post.post_uid === action.payload.post_uid
      );
      postsCopyB[indexToUpdateB].liked_by_me = false;
      postsCopyB[indexToUpdateB].post_likes_count =
        postsCopyB[indexToUpdateB].post_likes_count - 1;

      return {
        ...state,
        posts: postsCopyB,
      };

    case feedActionTypes.SAVE_POST:
      const postsCopyC = [...state.posts];
      const indexToUpdateC = postsCopyC.findIndex(
        (post) => post.post_uid === action.payload.post_uid
      );
      postsCopyC[indexToUpdateC].i_have_saved = true;

      return {
        ...state,
        posts: postsCopyC,
      };

    case feedActionTypes.UNSAVE_POST:
      const postsCopyD = [...state.posts];
      const indexToUpdateD = postsCopyD.findIndex(
        (post) => post.post_uid === action.payload.post_uid
      );
      postsCopyD[indexToUpdateD].i_have_saved = false;

      return {
        ...state,
        posts: postsCopyD,
      };

    case feedActionTypes.SOMETHING_WENT_WRONG:
      return {
        ...state,
        loading_likers: false,
        loading_feed: false,
        error: action.payload,
      };

    case feedActionTypes.SET_FEED:
      return {
        ...state,
        posts: action.payload,
        error: null,
        loading_likers: false,
        loading_feed: false,
      };

    case feedActionTypes.SET_POST_LIKERS:
      const postsCopyE = [...state.posts];
      const indexToUpdateE = postsCopyE.findIndex(
        (post) => post.post_uid === action.payload.post_uid
      );
      postsCopyE[indexToUpdateE].post_likers = action.payload.likers;
      return {
        ...state,
        posts: postsCopyE,
        loading_feed: false,
        loading_likers: false,
      };

    case feedActionTypes.GETTING_FEED:
      return {
        ...state,
        loading_feed: true,
        error: null,
      };

    case feedActionTypes.GETTING_LIKERS:
      return {
        ...state,
        loading_likers: true,
        error: null,
      };

    case feedActionTypes.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(
          (post) => post.post_uid !== action.payload.post_uid
        ),
      };

    case feedActionTypes.UPLOAD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };

    default:
      return state;
  }
};

export default feedReducer;
