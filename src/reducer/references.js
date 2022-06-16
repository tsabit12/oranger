import agama from "../data/agama.json";
import { GET_BERKAS, GET_OFFICE, UPDATE_BERKAS } from "../types";

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
    case UPDATE_BERKAS:
      return {
        ...state,
        berkas: state.berkas.map((row) => {
          if (row.berkasid === action.data.berkasid) {
            return {
              ...action.data,
            };
          }

          return row;
        }),
      };
    default:
      return state;
  }
}
