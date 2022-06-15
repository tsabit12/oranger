import api from "../api";
import { GET_PKS } from "../types";

export const getpks = (params) => (dispatch) =>
  api.pks.get(params).then((res) => {
    if (res.status === true) {
      dispatch({
        type: GET_PKS,
        page: params.page,
        data: res.data,
        total: res.total,
      });
    } else {
      return Promise.reject(res);
    }
  });
