import { combineReducers } from "redux";
import recommendations from "./recommendations";
import users from "./users";
import venues from "./venues";

export default combineReducers({
  recommendations,
  users,
  venues
});
