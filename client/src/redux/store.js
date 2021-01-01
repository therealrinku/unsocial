import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

const logger = (store) => {
  return (next) => {
    return (action) => {
      next(action);
      console.log(action.type);
      console.log(store.getState());
    };
  };
};

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;
