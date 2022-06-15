import api from "../api";
import { GET_KANDIDAT } from "../types";

export const getkandidat = (params, page) => (dispatch) =>
  api.user.kandidat(params).then((res) => {
    if (res.status === true) {
      dispatch({
        type: GET_KANDIDAT,
        page,
        data: res.data,
        total: res.total,
      });
    } else {
      return Promise.reject(res);
    }
  });
