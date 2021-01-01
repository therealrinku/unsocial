import { combineReducers } from "redux";
import feedReducer from "./feed/feedReducer";
import userReducer from "./user/userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  feed: feedReducer,
});

export default rootReducer;
