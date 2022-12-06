import { combineReducers } from "@reduxjs/toolkit";
import auth from "app/auth/store";
import user from "app/main/Redux_Store/userSlice"
import fuse from "./fuse";
import i18n from "./i18nSlice";

const createReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
	user,
    auth,
    fuse,
    i18n,
    ...asyncReducers,
  });

  /*
	Reset the redux store when user logged out
	 */
  if (action.type === "auth/user/userLoggedOut") {
    state = undefined;
  }

  return combinedReducer(state, action);
};

export default createReducer;
