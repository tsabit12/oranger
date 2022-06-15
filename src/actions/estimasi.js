import api from "../api";
import { GET_ESTIMASI } from "../types";

export const getestimasi = (params, page) => (dispatch) =>
  api.trx.estimasi(params).then((res) => {
    if (res.status === true) {
      dispatch({
        type: GET_ESTIMASI,
        page,
        data: res.data,
        total: res.total,
      });
    } else {
      return Promise.reject(res);
    }
  });
