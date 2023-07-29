import axios from "axios";
import defaultUser from "./user.reducer";
axios.defaults.withCredentials = true;

const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";
const EDIT_USER = "EDIT_USER";
const LOGIN_ERROR = "LOGIN_ERROR";
const RESET_LOGIN_ERROR = "RESET_LOGIN_ERROR";

const getUser = (user) => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
const editUser = (userEmail, updates) => ({
  type: EDIT_USER,
  payload: {
    id: userEmail,
    updates: updates,
  },
});
const loginError = (error) => ({ type: LOGIN_ERROR, payload: error });
const resetLoginError = () => ({ type: RESET_LOGIN_ERROR });

export const me = (email) => async (dispatch) => {
  try {
    const res = await axios.post(
      "https://ticketwingman-backend.onrender.com/auth/me",
      {
        email,
      }
    );
    console.log("ME RESPONSE", res.data);
    dispatch(getUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const authSignup =
  (firstName, lastName, email, password) => async (dispatch) => {
    let res;
    try {
      res = await axios.post(
        `https://ticketwingman-backend.onrender.com/auth/signup`,
        {
          firstName,
          lastName,
          email,
          password,
        }
      );
    } catch (authError) {
      return dispatch(getUser({ error: authError }));
    }

    try {
      dispatch(getUser(res.data));
      // history.push("/home");
    } catch (dispatchOrHistoryErr) {
      console.error(dispatchOrHistoryErr);
    }
  };

export const authLogin = (email, password) => async (dispatch) => {
  let res;
  try {
    res = await axios.post(
      `https://ticketwingman-backend.onrender.com/auth/login`,
      {
        email,
        password,
      }
    );
  } catch (authError) {
    return dispatch(loginError(authError.message));
  }

  try {
    dispatch(getUser(res.data));
    // history.push("/home");
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.post("https://ticketwingman-backend.onrender.com/auth/logout");
    dispatch(removeUser());
  } catch (err) {
    console.error(err);
  }
};

export const editUserThunk = (userEmail, updates) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `https://ticketwingman-backend.onrender.com/api/user/${userEmail}`,
        updates
      );
      dispatch(editUser(userEmail, { updates: response.data }));
    } catch (error) {
      console.error(error);
    }
  };
};

export { resetLoginError };
