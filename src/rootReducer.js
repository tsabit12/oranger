import { combineReducers } from "redux";
import auth from "./reducer/auth";
import references from "./reducer/references";

export default combineReducers({
  auth,
  references,
});
