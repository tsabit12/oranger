import { GET_ESTIMASI } from "../types";
const initialState = {
  total: 0,
  page: 0,
  data: {},
};

export default function estimasi(state = initialState, action = {}) {
  switch (action.type) {
    case GET_ESTIMASI:
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
