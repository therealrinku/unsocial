import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import profileReducer from "./profile/profileReducer";
import postsReducer from "./post/postsReducer";

const rootReducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  posts: postsReducer,
});

export default rootReducer;
