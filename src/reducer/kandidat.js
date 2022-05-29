import { GET_KANDIDAT } from "../types";

const initialState = {
  total: 0,
  page: 0,
  search: "",
  data: {},
};

export default function kandidat(state = initialState, action = {}) {
  switch (action.type) {
    case GET_KANDIDAT:
      return {
        ...state,
        page: action.page,
        data: {
          ...state.data,
          [action.page]: action.data,
        },
        total: action.total,
      };
    default:
      return state;
  }
}
