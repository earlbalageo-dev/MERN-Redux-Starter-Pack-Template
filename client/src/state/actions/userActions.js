import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGOUT_USER,
} from "../constants/userConstants";

import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_USER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/v1/auth/login",
      { email, password },
      config
    );

    if (data) {
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: data.userInfo,
      });

      localStorage.setItem("auth", JSON.stringify(data.token));
      localStorage.setItem("userInfo", JSON.stringify(data.userInfo));
    }
  } catch (error) {
    dispatch({
      type: LOGIN_USER_FAIL,
      payload: error,
    });
  }
};

export const register =
  (email, firstName, lastName, password) => async (dispatch) => {
    try {
      dispatch({
        type: REGISTER_USER_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/v1/auth/register",
        { email, firstName, lastName, password },
        config
      );

      if (data) {
        dispatch({
          type: REGISTER_USER_SUCCESS,
          payload: data.userInfo,
        });

        localStorage.setItem("auth", JSON.stringify(data.token));
        localStorage.setItem("userInfo", JSON.stringify(data.userInfo));
      }
    } catch (error) {
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: error,
      });
    }
  };

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT_USER,
  });

  localStorage.removeItem("auth");
  localStorage.removeItem("userInfo");
};
