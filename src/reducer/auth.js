import { LOGGED_IN } from "../types";

export default function auth(state = {}, action = {}) {
  switch (action.type) {
    case LOGGED_IN:
      return { ...action.result, token: action.token };
    default:
      return state;
  }
}
