import { combineReducers } from "redux";
import feedReducer from "./feed/feedReducer";
import userReducer from "./user/userReducer";
import profileReducer from "./profile/profileReducer";
import postsReducer from "./posts/postsReducer";

const rootReducer = combineReducers({
  user: userReducer,
  feed: feedReducer,
  profile: profileReducer,
  posts: postsReducer,
});

export default rootReducer;
