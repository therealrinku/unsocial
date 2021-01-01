import userActionTypes from "./userActionTypes";

const intialState = {
  currentUserData: {
    uid: "d8883ab6-67de-4c8f-a99d-992fd6dcf6ea",
    username: "amy",
    profile_image_url: "https://bit.ly/3huLWvT",
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
        currentUsername: action.payload.username,
        currentUserData: action.payload.userData,
        loading: false,
        error: null,
      };

    case userActionTypes.LOGOUT:
      return {
        ...state,
        currentUsername: null,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export default userReducer;
