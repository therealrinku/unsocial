import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

const logger = (store) => {
  return (next) => {
    return (action) => {
      next(action);
    };
  };
};

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;
