import {combineReducers} from "redux";
import user from "./user";
import stats from "./stats";

export default combineReducers({
    user, stats
});