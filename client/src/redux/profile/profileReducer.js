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
      const unfollowedUserIndexA = profileCopyA.findIndex(
        (profile) => profile.username === action.payload
      );
      profileCopyA[unfollowedUserIndexA].followed_by_me = true;
      return {
        ...state,
        profiles: profileCopyA,
      };

    case profileActionTypes.UNFOLLOW:
      const profileCopyB = [...state.profiles];
      const unfollowedUserIndexB = profileCopyB.findIndex(
        (profile) => profile.username === action.payload
      );
      profileCopyB[unfollowedUserIndexB].followed_by_me = false;
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
