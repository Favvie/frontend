import { Dispatch } from "redux";
import { userFetcher, userFetcherWithAuth } from "@/helpers";
import { UserLogin, UserUpdate } from "@/interfaces/commonTypes";
import {
  GET_USER,
  LOGIN_USER,
  RESEND_VERIFICATION_EMAIL,
  RESET_PASSWORD,
  USER_ACCOUNT_UPDATE,
} from "./user.queries";
import {
  SET_USER,
  CLEAR_USER,
  UPDATE_USER,
  SET_ERROR,
  LOADING,
  CHANGE_PASSWORD,
  RESEND_EMAIL,
  LOGIN_USER as USERLOGIN,
  GET_USER_DATA,
} from "./user.types";

export function setLoading() {
  return function (dispatch: Dispatch) {
    dispatch({
      type: LOADING,
      payload: true,
    });
  };
}

export const setUser = (user: any) => ({
  type: SET_USER,
  payload: user,
});

export function getUserData(token: string) {
  return async function (dispatch: Dispatch) {
    try {
      setLoading();
      const response = await userFetcherWithAuth(GET_USER, { token }, token);
      console.log(response);
      dispatch({
        type: GET_USER_DATA,
        payload: response.userData,
      });
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: error.message,
      });
    }
  };
}

export function loginUser(user: UserLogin) {
  return async function (dispatch: Dispatch) {
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });
      const myIp = await (await fetch("https://api.ipify.org")).text();
      const response = await userFetcher(LOGIN_USER, { ...user, ip: myIp });
      import("antd").then(({ message }) => {
        response.loginUser.status
          ? message.success(response.loginUser.message)
          : message.error(response.loginUser.message);
      });
      dispatch({
        type: USERLOGIN,
        payload: response.loginUser,
      });
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: error.message,
      });
    }
  };
}

// update user account
export function updateUser(user: UserUpdate, token: string) {
  return async function (dispatch: Dispatch) {
    try {
      setLoading();
      const result = await userFetcherWithAuth(
        USER_ACCOUNT_UPDATE,
        user,
        token
      );
      // console.log({ result });
      import("antd").then((antd) => {
        result.userAccountUpdate
          ? antd.message.success(result.userAccountUpdate.message)
          : antd.message.error(result.userAccountUpdate.message);
      });
      result.userAccountUpdate.status &&
        dispatch({
          type: UPDATE_USER,
          payload: user,
        });
    } catch (err) {
      import("antd").then((antd) => {
        antd.message.error(err.message);
      });
      dispatch({
        type: SET_ERROR,
        payload: err.message,
      });
    }
  };
}

// send password reset email
export function sendPasswordResetEmail(email: string, token: string) {
  return async function (dispatch: Dispatch) {
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });
      const result = await userFetcherWithAuth(
        RESEND_VERIFICATION_EMAIL,
        { email },
        token
      );
      console.log({ result });
      import("antd").then((antd) => {
        result.sendPasswordResetEmail.status
          ? antd.message.success(result.sendPasswordResetEmail.message)
          : antd.message.error(result.sendPasswordResetEmail.message);
      });
      result.sendPasswordResetEmail.status &&
        dispatch({
          type: RESEND_EMAIL,
          payload: result.sendPasswordResetEmail,
        });
    } catch (err) {
      import("antd").then((antd) => {
        antd.message.error(err.message);
      });
    }
  };
}

// change password
export function changePassword(
  changeData: { password1: string; password2: string; token: string },
  token: string
) {
  return async function (dispatch: Dispatch) {
    try {
      setLoading();
      const result = await userFetcherWithAuth(
        RESET_PASSWORD,
        changeData,
        token
      );
      import("antd").then((antd) => {
        result.changePassword.status
          ? antd.message.success(result.changePassword.message)
          : antd.message.error(result.changePassword.message);
      });
      result.changePassword.status &&
        dispatch({
          type: CHANGE_PASSWORD,
          payload: result.changePassword,
        });
    } catch (err) {
      import("antd").then((antd) => {
        antd.message.error(err.message);
      });
      dispatch({
        type: SET_ERROR,
        payload: err.message,
      });
    }
  };
}

export const logout = () => ({
  type: CLEAR_USER,
  payload: null,
});
