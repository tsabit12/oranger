import api from "../api";
import { GET_KELOLA_OFFICE } from "../types";

export const getdata = (params, page) => (dispatch) =>
  api.office.get(params).then((res) => {
    if (res.status === true) {
      dispatch({
        type: GET_KELOLA_OFFICE,
        page,
        data: res.data,
        total: res.total,
      });
    } else {
      return Promise.reject(res);
    }
  });
