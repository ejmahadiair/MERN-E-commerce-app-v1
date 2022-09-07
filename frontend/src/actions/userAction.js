import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERROR,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
  PASSWROD_UPDATE_FAIL,
  PASSWROD_UPDATE_REQUEST,
  PASSWROD_UPDATE_SUCCESS,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  GET_ALL_USERS_FAIL,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
} from "../constants/userConstant";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/v1/login`,
      {
        email,
        password,
      },
      config
    );
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const register = (name, email, password) => async (dispatch) => {
  console.log(name, " ", email, " ", password);
  try {
    dispatch({ type: REGISTER_REQUEST });
    const config = {
      header: { "Content-Type": "application/json" },
    };
    const { data } = await axios.post(
      `/api/v1/register`,
      {
        name,
        email,
        password,
      },
      config
    );
    console.log("data: ", data);
    dispatch({ type: REGISTER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: REGISTER_FAIL, payload: error.response.data.message });
  }
};
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    const { data } = await axios.get(`/api/v1/me`);
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};
export const logOutUser = () => async (dispatch) => {
  try {
    await axios.get(`/api/v1/logout`);
    dispatch({ type: USER_LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: USER_LOGOUT_FAIL, payload: error.response.data.message });
  }
};

export const UpadateUserDetails = (formdata) => async (dispatch) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });
    const config = {
      header: { "Content-Type": "application/json" },
    };
    const { data } = await axios.put(`/api/v1/me/update`, formdata, config);
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: error.response.data.message });
  }
};

export const UpdateUserPassword =
  (oldPassword, newPassword, confirmPassword) => async (dispatch) => {
    try {
      dispatch({ type: PASSWROD_UPDATE_REQUEST });
      const config = {
        header: { "Content-Type": "application/json" },
      };
      const { data } = await axios.put(
        `/api/v1/password/update`,
        {
          oldPassword,
          newPassword,
          confirmPassword,
        },
        config
      );
      dispatch({ type: PASSWROD_UPDATE_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({
        type: PASSWROD_UPDATE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    const config = {
      header: { "Content-Type": "application/json" },
    };
    const { data } = await axios.post(
      `/api/v1/password/forgot`,
      { email },
      config
    );
    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const resetPassword =
  (token, password, confirmPassword) => async (dispatch) => {
    try {
      dispatch({ type: RESET_PASSWORD_REQUEST });
      const config = {
        header: { "Content-Type": "application/json" },
      };
      const { data } = await axios.put(
        `/api/v1/password/reset/${token}`,
        { password, confirmPassword },
        config
      );
      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//get all users admin
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_USERS_REQUEST });
    const res = await axios.get(`/api/v1/admin/users`);
    dispatch({ type: GET_ALL_USERS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_ALL_USERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
