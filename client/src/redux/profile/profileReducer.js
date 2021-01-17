import profileActionTypes from "./profileActionTypes";

const initialState = {
  profiles: [],
  loading: false,
  error: null,
  loading_followers_or_following: false,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case profileActionTypes.CLEAR_PROFILES:
      return {
        ...state,
        profiles: [],
      };

    case profileActionTypes.SET_FOLLOWERS:
      const profileCopy0 = [...state.profiles];
      const userIndex0 = profileCopy0.findIndex(
        (profile) => profile.username === action.payload.username
      );
      profileCopy0[userIndex0].followers = action.payload.followers;
      return {
        ...state,
        profiles: profileCopy0,
        loading_followers_or_following: false,
        error: false,
      };

    case profileActionTypes.SET_FOLLOWINGS:
      const profileCopy1 = [...state.profiles];
      const userIndex1 = profileCopy1.findIndex(
        (profile) => profile.username === action.payload.username
      );
      profileCopy1[userIndex1].followings = action.payload.followings;
      return {
        ...state,
        profiles: profileCopy1,
        loading_followers_or_following: false,
        error: false,
      };

    case profileActionTypes.LOADING_FOLLOWERS_OR_FOLLOWING_LIST:
      return {
        ...state,
        loading: false,
        error: null,
        loading_followers_or_following: true,
      };

    case profileActionTypes.LOADING_PROFILE:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case profileActionTypes.SET_PROFILE:
      return {
        ...state,
        profiles: [...state.profiles, action.payload],
        loading: false,
        error: null,
        loading_followers_or_following: false,
      };

    case profileActionTypes.FOLLOW:
      const profileCopyA = [...state.profiles];
      const followedUserIndexA = profileCopyA.findIndex(
        (profile) => profile.uid === action.payload
      );
      profileCopyA[followedUserIndexA].followed_by_me = true;
      profileCopyA[followedUserIndexA].followers_count =
        profileCopyA[followedUserIndexA].followers_count + 1;
      return {
        ...state,
        profiles: profileCopyA,
      };

    case profileActionTypes.UNFOLLOW:
      const profileCopyB = [...state.profiles];
      const unfollowedUserIndexB = profileCopyB.findIndex(
        (profile) => profile.uid === action.payload
      );
      profileCopyB[unfollowedUserIndexB].followed_by_me = false;
      profileCopyB[unfollowedUserIndexB].followers_count =
        profileCopyB[unfollowedUserIndexB].followers_count - 1;
      return {
        ...state,
        profiles: profileCopyB,
      };

    case profileActionTypes.ERROR_IN_PROFILE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default profileReducer;
