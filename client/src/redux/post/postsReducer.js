import postActionTypes from "./postsActionTypes";

const initial_state = {
  posts: [],
  error: null,
  loading_feed: false,
  loading_likers: false,
  feed_loaded: false,
  loading_post: false,
  loading_explore_posts: false,
  explore_posts: [],
  adding_comment: false,
  getting_comments: false,
  getting_comment_likers: false,
  uploadingPost: false,
  message: null,
};

const postsReducer = (state = initial_state, action) => {
  switch (action.type) {
    case postActionTypes.ADD_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };

    case postActionTypes.CLEAR_POSTS:
      return {
        ...state,
        posts: [],
        explore_posts: [],
        feed_loaded: false,
      };

    case postActionTypes.GETTING_COMMENT_LIKERS:
      return {
        ...state,
        getting_comment_likers: true,
      };

    case postActionTypes.ADD_COMMENT_LIKERS:
      console.log(action.payload.comment_uid);
      const postsCopyR = [...state.posts];
      const postIndexR = postsCopyR.findIndex((post) => post.post_uid === action.payload.post_uid);
      const commentsR = [...postsCopyR[postIndexR].comments];
      const commentIndexR = commentsR.findIndex((comment) => comment.comment_uid === action.payload.comment_uid);
      commentsR[commentIndexR].likers = action.payload.likers;
      return {
        ...state,
        posts: postsCopyR,
        getting_comment_likers: false,
      };

    case postActionTypes.LIKE_COMMENT:
      const postsCopyU = [...state.posts];
      const postIndexU = postsCopyU.findIndex((post) => post.post_uid === action.payload.post_uid);
      const comments = [...postsCopyU[postIndexU].comments];
      const commentIndex = comments.findIndex((comment) => comment.comment_uid === action.payload.comment_uid);
      comments[commentIndex].liked_by_me = true;
      comments[commentIndex].comment_likes_count = comments[commentIndex].comment_likes_count + 1;
      postsCopyU[postIndexU].comments = comments;
      return {
        ...state,
        posts: postsCopyU,
      };

    case postActionTypes.UNLIKE_COMMENT:
      const postsCopyV = [...state.posts];
      const postIndexV = postsCopyV.findIndex((post) => post.post_uid === action.payload.post_uid);
      const commentsV = [...postsCopyV[postIndexV].comments];
      const commentIndexV = commentsV.findIndex((comment) => comment.comment_uid === action.payload.comment_uid);
      commentsV[commentIndexV].liked_by_me = false;
      commentsV[commentIndexV].comment_likes_count = commentsV[commentIndexV].comment_likes_count - 1;
      postsCopyV[postIndexV].comments = commentsV;
      return {
        ...state,
        posts: postsCopyV,
      };

    case postActionTypes.DELETE_COMMENT:
      const postsCopyJ = [...state.posts];
      const postIndexJ = postsCopyJ.findIndex((post) => post.post_uid === action.payload.post_uid);
      const commentsJ = [...postsCopyJ[postIndexJ].comments].filter(
        (comment) => comment.comment_uid !== action.payload.comment_uid
      );
      postsCopyJ[postIndexJ].post_comments_count = postsCopyJ[postIndexJ].post_comments_count - 1;
      postsCopyJ[postIndexJ].comments = commentsJ;

      return {
        ...state,
        posts: postsCopyJ,
      };

    case postActionTypes.GETTING_COMMENTS:
      return {
        ...state,
        getting_comments: true,
      };

    case postActionTypes.ADD_COMMENTS:
      const postsCopy = [...state.posts];
      const postIndex = postsCopy.findIndex((post) => post.post_uid === action.payload.post_uid);
      postsCopy[postIndex].comments = action.payload.comments;

      return {
        ...state,
        posts: postsCopy,
        getting_comments: false,
      };

    case postActionTypes.ADDING_COMMENT:
      return {
        ...state,
        error: null,
        adding_comment: true,
      };

    case postActionTypes.ADD_COMMENT:
      const postsCopyX = [...state.posts];
      const postIndexX = postsCopyX.findIndex((post) => post.post_uid === action.payload.post_uid);
      postsCopyX[postIndexX].post_comments_count = postsCopyX[postIndexX].post_comments_count + 1;
      postsCopyX[postIndexX].comments
        ? (postsCopyX[postIndexX].comments = [action.payload, ...postsCopyX[postIndexX].comments])
        : (postsCopyX[postIndexX].comments = [action.payload]);

      return {
        ...state,
        error: null,
        adding_comment: false,
        posts: postsCopyX,
      };

    case postActionTypes.LOADING_EXPLORE_POSTS:
      return {
        ...state,
        error: null,
        loading_explore_posts: true,
      };

    case postActionTypes.ADD_EXPLORE_POSTS:
      return {
        ...state,
        loading_explore_posts: false,
        explore_posts: action.payload,
        error: null,
      };

    case postActionTypes.GETTING_POST:
      return {
        ...state,
        loading_post: true,
      };

    case postActionTypes.ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
        loading_post: false,
        error: null,
      };

    case postActionTypes.LIKE_POST:
      const postsCopyA = [...state.posts];
      const indexToUpdateA = postsCopyA.findIndex((post) => post.post_uid === action.payload.post_uid);
      postsCopyA[indexToUpdateA].liked_by_me = true;
      postsCopyA[indexToUpdateA].post_likes_count = postsCopyA[indexToUpdateA].post_likes_count + 1;

      return {
        ...state,
        posts: postsCopyA,
      };

    case postActionTypes.UNLIKE_POST:
      const postsCopyB = [...state.posts];
      const indexToUpdateB = postsCopyB.findIndex((post) => post.post_uid === action.payload.post_uid);
      postsCopyB[indexToUpdateB].liked_by_me = false;
      postsCopyB[indexToUpdateB].post_likes_count = postsCopyB[indexToUpdateB].post_likes_count - 1;

      return {
        ...state,
        posts: postsCopyB,
      };

    case postActionTypes.SAVE_POST:
      const postsCopyC = [...state.posts];
      const indexToUpdateC = postsCopyC.findIndex((post) => post.post_uid === action.payload.post_uid);
      postsCopyC[indexToUpdateC].i_have_saved = true;

      return {
        ...state,
        posts: postsCopyC,
      };

    case postActionTypes.UNSAVE_POST:
      const postsCopyD = [...state.posts];
      const indexToUpdateD = postsCopyD.findIndex((post) => post.post_uid === action.payload.post_uid);
      postsCopyD[indexToUpdateD].i_have_saved = false;

      return {
        ...state,
        posts: postsCopyD,
      };

    case postActionTypes.SOMETHING_WENT_WRONG:
      return {
        ...state,
        loading_likers: false,
        loading_feed: false,
        error: action.payload,
        adding_comment: false,
        loading_post: false,
      };

    case postActionTypes.SET_FEED:
      return {
        ...state,
        posts: action.payload,
        error: null,
        loading_likers: false,
        loading_feed: false,
        feed_loaded: true,
      };

    case postActionTypes.SET_POST_LIKERS:
      const postsCopyE = [...state.posts];
      const indexToUpdateE = postsCopyE.findIndex((post) => post.post_uid === action.payload.post_uid);
      postsCopyE[indexToUpdateE].post_likers = action.payload.likers;
      return {
        ...state,
        posts: postsCopyE,
        loading_feed: false,
        loading_likers: false,
      };

    case postActionTypes.GETTING_FEED:
      return {
        ...state,
        loading_feed: true,
        error: null,
      };

    case postActionTypes.GETTING_LIKERS:
      return {
        ...state,
        loading_likers: true,
        error: null,
      };

    case postActionTypes.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.post_uid !== action.payload.post_uid),
      };

    case postActionTypes.UPLOADING_POST:
      return {
        ...state,
        uploadingPost: true,
      };

    case postActionTypes.UPLOAD_POST:
      return {
        ...state,
        uploadingPost: false,
        posts: [...state.posts, action.payload],
      };

    default:
      return state;
  }
};

export default postsReducer;
