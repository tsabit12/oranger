import { combineReducers } from "redux";
import auth from "./reducer/auth";
import references from "./reducer/references";
import menus from "./reducer/menus";
import kandidat from "./reducer/kandidat";
import pks from "./reducer/pks";

export default combineReducers({
  auth,
  references,
  menus,
  kandidat,
  pks,
});
