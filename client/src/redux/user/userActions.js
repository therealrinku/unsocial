import { loginUser, loginWithUid } from "../../services/authServices";
import { getRecommendedUsers } from "../../services/userServices";
import userActionTypes from "./userActionTypes";

export const GET_RECOMMENDED = () => async (dispatch) => {
  try {
    dispatch({ type: userActionTypes.LOADING });
    const data = await getRecommendedUsers(uid);
    dispatch({ type: userActionTypes.SET_RECOMMENDED_USERS, payload: data });
  } catch (err) {
    dispatch({
      type: userActionTypes.SOMETHING_WENT_WRONG,
      payload: err.message,
    });
  }
};

export const LOGIN_WITH_UID = (uid) => async (dispatch) => {
  try {
    dispatch({ type: userActionTypes.LOADING });
    const data = await loginWithUid(uid);
    dispatch({ type: userActionTypes.LOGIN, payload: data[0] });
  } catch (err) {
    dispatch({
      type: userActionTypes.SOMETHING_WENT_WRONG,
      payload: err.message,
    });
  }
};

export const LOGIN = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: userActionTypes.LOADING });
    const response = await loginUser(username, password);
    if (typeof response === "object") {
      dispatch({ type: userActionTypes.LOGIN, payload: response });
      localStorage.setItem("token", response.uid);
    } else {
      throw new Error(response);
    }
  } catch (err) {
    dispatch({
      type: userActionTypes.SOMETHING_WENT_WRONG,
      payload: err.message,
    });
  }
};

export const LOGOUT = () => (dispatch) => {
  dispatch({ type: userActionTypes.LOGOUT });
};
