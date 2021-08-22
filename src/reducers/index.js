import { combineReducers } from "redux";
import studentReducer from "./student_reducer";

const allReducers = combineReducers({
  studentReducer,
});

export default allReducers;
