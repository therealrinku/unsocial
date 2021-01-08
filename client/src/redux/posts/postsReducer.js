import postActionTypes from "./postsActionsTypes";

const initialState = {
  posts: [],
  loading_post: false,
  error: null,
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case postActionTypes.LOADING_POST:
      return {
        ...state,
        loading_post: true,
        error: null,
      };

    case postActionTypes.SET_POST:
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
        loading_post: false,
        error: null,
      };

    case postActionTypes.ERROR_LOADING_POST:
      return {
        ...state,
        loading_post: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default postsReducer;
