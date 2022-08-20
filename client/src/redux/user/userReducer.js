import userActionTypes from "./userActionTypes";

const intialState = {
  currentUserData: {
    uid: null,
    username: null,
    profile_image_url: null,
    email: null,
    bio: null,
  },
  user_data_loaded: false,
  token: localStorage.getItem("token"),
  error: null,
  loading: false,
  recommendedUsers: [],
};

const userReducer = (state = intialState, action) => {
  switch (action.type) {
    case userActionTypes.UPDATE_PROFILE_LOCALLY:
      return {
        ...state,
        currentUserData: {
          ...state.currentUserData,
          ...action.payload,
        },
      };

    case userActionTypes.FOLLOW_RECOMMENDED:
      const copyA = [...state.recommendedUsers];
      const followedUserIndexA = copyA.findIndex((profile) => profile.uid === action.payload);
      copyA[followedUserIndexA].i_am_following = true;
      return {
        ...state,
        recommendedUsers: copyA,
      };

    case userActionTypes.UNFOLLOW_RECOMMENDED:
      const copyB = [...state.recommendedUsers];
      const unfollowedUserIndexB = copyB.findIndex((profile) => profile.uid === action.payload);
      copyB[unfollowedUserIndexB].i_am_following = false;
      return {
        ...state,
        recommendedUsers: copyB,
      };

    case userActionTypes.SET_RECOMMENDED_USERS:
      return {
        ...state,
        loading: false,
        recommendedUsers: action.payload,
      };

    case userActionTypes.LOADING:
      return {
        ...state,
        loading: true,
      };

    case userActionTypes.SOMETHING_WENT_WRONG:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case userActionTypes.LOGIN:
      return {
        ...state,
        currentUserData: action.payload,
        loading: false,
        error: null,
        token: state.token || action.payload.token,
        user_data_loaded: true,
      };

    case userActionTypes.LOGOUT:
      return {
        ...state,
        currentUserData: { uid: null, profile_image_url: null, username: null },
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export default userReducer;
