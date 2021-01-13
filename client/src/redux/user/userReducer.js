import userActionTypes from "./userActionTypes";

const intialState = {
  currentUserData: {
    uid: null,
    username: null,
    profile_image_url: null,
  },
  error: null,
  loading: false,
};

const userReducer = (state = intialState, action) => {
  switch (action.type) {
    case userActionTypes.LOADING:
      return {
        ...state,
        loading: true,
      };

    case userActionTypes.SOMETHING_WENT_WRONG:
      return {
        ...state,
        error: action.payload,
      };

    case userActionTypes.LOGIN:
      return {
        ...state,
        currentUserData: action.payload,
        loading: false,
        error: null,
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
