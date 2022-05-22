import agama from "../data/agama.json";
import { GET_BERKAS, GET_OFFICE } from "../types";

const initialState = {
  berkas: [],
  agama,
  office: {},
};

export default function references(state = initialState, action = {}) {
  switch (action.type) {
    case GET_BERKAS:
      return {
        ...state,
        berkas: action.berkaslist,
      };
    case GET_OFFICE:
      return {
        ...state,
        office: action.data,
      };
    default:
      return state;
  }
}
