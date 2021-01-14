import { loginUser } from "../../services/authServices";
import userActionTypes from "./userActionTypes";

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
