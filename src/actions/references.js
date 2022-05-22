import api from "../api";
import { GET_BERKAS } from "../types";

// eslint-disable-next-line no-unused-vars
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
