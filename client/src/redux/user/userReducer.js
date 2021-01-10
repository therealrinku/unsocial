import userActionTypes from "./userActionTypes";

const intialState = {
  currentUserData: {
    uid: "53637ece-4a3a-404c-9448-e8e5aff5a35e",
    username: "rinku",
    profile_image_url:
      "https://images.unsplash.com/photo-1608176906358-808c28865e2e?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMjJ8fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
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
