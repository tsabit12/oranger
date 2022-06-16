import api from "../api";
import { GET_BERKAS, GET_OFFICE, UPDATE_BERKAS } from "../types";

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

export const updateBerkas = (payload) => (dispatch) =>
  api.references.updateBerkas(payload).then((res) => {
    if (res.status) {
      dispatch({
        type: UPDATE_BERKAS,
        data: payload,
      });
    } else {
      return Promise.reject(res);
    }
  });
