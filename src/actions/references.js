import api from "../api";
import { GET_BERKAS, GET_OFFICE } from "../types";

export const getBerkas = (params) => (dispatch) =>
  api.references.berkas(params).then((res) => {
    if (res.status === true) {
      dispatch({
        type: GET_BERKAS,
        berkaslist: res.result,
      });
    } else {
      return Promise.reject(res);
    }
  });

// eslint-disable-next-line no-unused-vars
export const getOffice = (params) => (dispatch) =>
  api.references.office(params).then((res) => {
    if (res.status === true) {
      dispatch({
        type: GET_OFFICE,
        data: res.result,
      });
    } else {
      return Promise.reject(res);
    }
  });
