import api from "../api";
import { GET_KANDIDAT } from "../types";

// eslint-disable-next-line no-unused-vars
export const getkandidat = (params) => (dispatch) =>
  api.user.kandidat(params).then((res) => {
    if (res.status === true) {
      dispatch({
        type: GET_KANDIDAT,
        page: params.page,
        data: res.data,
        total: res.total,
      });
    } else {
      return Promise.reject(res);
    }
  });
