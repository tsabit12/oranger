import api from "../api";
import jwt_decode from "jwt-decode";
import { LOGGED_IN } from "../types";
import Cookies from "js-cookie";
import axios from "axios";

export const login = (payload) => (dispatch) =>
  api.login(payload).then((res) => {
    if (res.status) {
      const decoded = jwt_decode(res.token);
      // eslint-disable-next-line no-undef
      Cookies.set(process.env.REACT_APP_COOKIES_NAME, res.token, {
        expires: 1,
      });

      dispatch({
        type: LOGGED_IN,
        result: decoded,
        token: res.token,
      });

      axios.interceptors.request.use(function (config) {
        config.headers["X-USER"] = res.token;
        return config;
      });

      return Promise.resolve(decoded);
    } else {
      return Promise.reject(res);
    }
  });

export const setLoggedIn = (token) => (dispatch) => {
  const decoded = jwt_decode(token);
  dispatch({
    type: LOGGED_IN,
    result: decoded,
    token,
  });

  axios.interceptors.request.use(function (config) {
    config.headers["X-USER"] = token;
    return config;
  });
};
