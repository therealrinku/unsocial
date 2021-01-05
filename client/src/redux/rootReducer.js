import { combineReducers } from "redux";
import feedReducer from "./feed/feedReducer";
import userReducer from "./user/userReducer";
import profileReducer from "./profile/profileReducer";

const rootReducer = combineReducers({
  user: userReducer,
  feed: feedReducer,
  profile: profileReducer,
});

export default rootReducer;
