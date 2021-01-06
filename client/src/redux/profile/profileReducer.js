import profileActionTypes from "./profileActionTypes";

const initialState = {
  profiles: [],
  loading: false,
  error: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
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
