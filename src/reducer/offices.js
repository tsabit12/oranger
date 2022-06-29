import { GET_KELOLA_OFFICE } from "../types";

const initialState = {
  total: 0,
  page: 0,
  data: {},
};

export default function offices(state = initialState, action = {}) {
  switch (action.type) {
    case GET_KELOLA_OFFICE:
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
