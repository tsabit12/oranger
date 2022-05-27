import { LOGGED_IN, LOGGED_OUT } from "../types";

export default function auth(state = {}, action = {}) {
  switch (action.type) {
    case LOGGED_IN:
      return { ...action.result, token: action.token };
    case LOGGED_OUT:
      return {};
    default:
      return state;
  }
}
