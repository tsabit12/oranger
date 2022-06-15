import { combineReducers } from "redux";
import auth from "./reducer/auth";
import references from "./reducer/references";
import menus from "./reducer/menus";
import kandidat from "./reducer/kandidat";
import pks from "./reducer/pks";
import estimasi from "./reducer/estimasi";

export default combineReducers({
  auth,
  references,
  menus,
  kandidat,
  pks,
  estimasi,
});
